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
    const {keyword,jobType, workMode,location,minSalary,maxSalary } = req.query;

    let query = {};

    /* Search by title */
    if (keyword) {
      query.title = { $regex: keyword, $options: "i" };
    }

    /* Filter by job type */
    if (jobType) {
      query.jobType = jobType;
    }

    /* Filter by work mode */
    if (workMode) {
      query.workMode = workMode;
    }

    /* Filter by location */
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    /* Salary range */
    if (minSalary || maxSalary) {
      query.salary = {};
      if (minSalary) query.salary.$gte = Number(minSalary);
      if (maxSalary) query.salary.$lte = Number(maxSalary);
    }

    const jobs = await Job.find(query).populate(
      "recruiter",
      "name email"
    );

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
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