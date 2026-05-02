import Application from "../model/application.model.js";
import Job from "../model/job.model.js";

/* APPLY JOB */
export const applyJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const userId = req.user.id;

    // Check job exists (lean = faster)
    const job = await Job.findById(jobId).select("_id").lean();
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });

    const application = await Application.create({ job: jobId, applicant: userId });

    res.status(201).json({ success: true, message: "Job applied successfully", application });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "You have already applied to this job" });
    }
    next(error);
  }
};

/* MY APPLICATIONS */
export const getMyApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ applicant: req.user.id })
      .populate("job")
      .lean();

    res.status(200).json({ success: true, count: applications.length, applications });
  } catch (error) {
    next(error);
  }
};

/* RECRUITER VIEW APPLICANTS FOR ONE JOB */
export const getJobApplicants = async (req, res, next) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId).select("title company recruiter").lean();
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });

    if (job.recruiter.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const applications = await Application.find({ job: jobId })
      .populate("applicant", "name email")
      .lean();

    const statusCount = { applied: 0, shortlisted: 0, rejected: 0 };
    applications.forEach((app) => {
      statusCount[app.status] = (statusCount[app.status] || 0) + 1;
    });

    return res.status(200).json({
      success: true,
      data: {
        jobTitle: job.title,
        company: job.company,
        totalApplicants: applications.length,
        statusBreakdown: statusCount,
        applicants: applications.map((app) => ({
          _id: app._id,
          applicant: {
            id: app.applicant._id,
            name: app.applicant.name,
            email: app.applicant.email,
          },
          status: app.status,
          appliedAt: app.createdAt,
        })),
      },
    });
  } catch (error) {
    next(error);
  }
};

/* ALL APPLICATIONS FOR RECRUITER — parallel fetch optimized */
export const getAllRecruiterApplications = async (req, res) => {
  try {
    const jobs = await Job.find({ recruiter: req.user.id }).select("_id title").lean();

    if (!jobs.length) return res.json({ success: true, applications: [], total: 0 });

    const jobIds = jobs.map((j) => j._id);

    const applications = await Application.find({ job: { $in: jobIds } })
      .populate({ path: "job", select: "title company" })
      .populate({ path: "applicant", select: "name email resume" })
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      total: applications.length,
      applications: applications.map((app) => ({
        _id: app._id,
        candidateName: app.applicant?.name || "Unknown",
        email: app.applicant?.email || "N/A",
        resumeUrl: app.applicant?.resume?.url || null,
        jobTitle: app.job?.title || "Deleted Job",
        company: app.job?.company || "",
        appliedDate: app.createdAt.toISOString().split("T")[0],
        status: app.status,
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
