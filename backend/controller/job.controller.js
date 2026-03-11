import Job from "../model/job.model.js";

/* Recruiter will CREATE JOB  */
export const createJob = async (req, res, next) => {
  try {
    const { title, description, company, location, salary, jobType, workMode, } = req.body;

    if (!title || !description || !company || !location || !jobType || !workMode) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    const job = await Job.create({
      title,
      description,
      company,
      location,
      salary,
      jobType,
      workMode,
      recruiter: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    next(error);
  }
};

/* GET JOBS WITH FILTER */
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
      limit = 10
    } = req.query;

    let query = {};

    if (keyword) {
      query.title = { $regex: keyword, $options: "i" };
    }

    if (jobType) {
      query.jobType = jobType;
    }

    if (workMode) {
      query.workMode = workMode;
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (minSalary || maxSalary) {
      query.salary = {};
      if (minSalary) query.salary.$gte = Number(minSalary);
      if (maxSalary) query.salary.$lte = Number(maxSalary);
    }

    /* Add cursor-based pagination */
    if (cursor) {
      query._id = { $lt: cursor };
    }

    const jobs = await Job.find(query)
      .sort({ _id: -1 }) // Sort by _id descending (newest first)
      .limit(parseInt(limit))
      .populate("recruiter", "name email");

    const nextCursor = jobs.length > 0 ? jobs[jobs.length - 1]._id : null;

    const hasMore = jobs.length === parseInt(limit);

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
      pagination: {
        nextCursor,
        hasMore,
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    next(error);
  }
};
/* GET JOB BY ID */
export const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "recruiter",
      "name email"
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    next(error);
  }
};

/* RECRUITER JOBS */
export const getRecruiterJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ recruiter: req.user.id });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    next(error);
  }
};