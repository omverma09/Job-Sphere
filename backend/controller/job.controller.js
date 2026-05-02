import Job from "../model/job.model.js";

/* CREATE JOB */
export const createJob = async (req, res, next) => {
  try {
    const { title, description, company, location, salary, jobType, workMode } = req.body;

    if (!title || !description || !company || !location || !jobType || !workMode) {
      return res.status(400).json({ success: false, message: "All required fields must be filled" });
    }

    const job = await Job.create({
      title, description, company, location, salary, jobType, workMode,
      recruiter: req.user.id,
    });

    res.status(201).json({ success: true, message: "Job created successfully", job });
  } catch (error) {
    next(error);
  }
};

/* GET JOBS WITH FILTER — optimized with text index + lean() */
export const getAllJobs = async (req, res, next) => {
  try {
    const {
      keyword,
      jobType,
      workMode,
      location,
      minSalary,
      maxSalary,
      cursor,
      limit = 10,
    } = req.query;

    let query = {};

    // Use MongoDB text index for keyword (faster than $regex)
    if (keyword) {
      query.$text = { $search: keyword };
    }

    if (jobType) query.jobType = jobType;
    if (workMode) query.workMode = workMode;
    if (location) query.location = { $regex: location, $options: "i" };

    if (minSalary || maxSalary) {
      query.salary = {};
      if (minSalary) query.salary.$gte = Number(minSalary);
      if (maxSalary) query.salary.$lte = Number(maxSalary);
    }

    if (cursor) query._id = { $lt: cursor };

    const parsedLimit = Math.min(parseInt(limit) || 10, 50); // max 50

    // .lean() returns plain JS objects — 2-3× faster than Mongoose docs
    const jobs = await Job.find(query)
      .sort({ _id: -1 })
      .limit(parsedLimit)
      .populate("recruiter", "name email")
      .lean();

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
      pagination: {
        nextCursor: jobs.length > 0 ? jobs[jobs.length - 1]._id : null,
        hasMore: jobs.length === parsedLimit,
        limit: parsedLimit,
      },
    });
  } catch (error) {
    next(error);
  }
};

/* GET JOB BY ID */
export const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("recruiter", "name email")
      .lean();

    if (!job) return res.status(404).json({ success: false, message: "Job not found" });

    res.status(200).json({ success: true, job });
  } catch (error) {
    next(error);
  }
};

/* RECRUITER JOBS */
export const getRecruiterJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ recruiter: req.user.id })
      .select("title company location jobType workMode createdAt") // only needed fields
      .lean();

    res.status(200).json({ success: true, count: jobs.length, jobs });
  } catch (error) {
    next(error);
  }
};
