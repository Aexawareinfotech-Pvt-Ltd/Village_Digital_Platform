import Job from "../../models/Job/Job.js";
import GovernmentJob from "../../models/Job/GovernmentJob.js";
import JobApplication from "../../models/Job/JobApplication.js";

export const getJobAnalytics = async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments();
    const approvedJobs = await Job.countDocuments({ status: "approved" });
    const pendingJobs = await Job.countDocuments({ status: "pending" });
    const governmentJobs = await GovernmentJob.countDocuments();
    const totalApplications = await JobApplication.countDocuments();

    // Jobs by category
    const jobsByCategory = await Job.aggregate([
      { $group: { _id: "$category", totalJobs: { $sum: 1 } } }
    ]);

    // Applications by category
    const applicationsByCategory = await JobApplication.aggregate([
      {
        $lookup: {
          from: "jobs",
          localField: "jobId",
          foreignField: "_id",
          as: "job"
        }
      },
      { $unwind: "$job" },
      {
        $group: {
          _id: "$job.category",
          applications: { $sum: 1 }
        }
      }
    ]);

    // Top jobs by applications
    const topJobs = await JobApplication.aggregate([
      {
        $group: {
          _id: "$jobId",
          applications: { $sum: 1 }
        }
      },
      { $sort: { applications: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "jobs",
          localField: "_id",
          foreignField: "_id",
          as: "job"
        }
      },
      { $unwind: "$job" }
    ]);

    res.json({
      success: true,
      data: {
        totalJobs,
        approvedJobs,
        pendingJobs,
        governmentJobs,
        totalApplications,
        jobsByCategory,
        applicationsByCategory,
        topJobs
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
