import Job from "../../models/Job/Job.js";
import JobApplication from "../../models/Job/JobApplication.js";
import sendJobApplyEmail from "../../utils/sendJobApplyEmail.js";

// USER: Apply for Job
export const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user.id;
    const { name, email, phone } = req.body;

    const job = await Job.findById(jobId);
    if (!job || job.status !== "approved") {
      return res.status(400).json({ message: "Job not available" });
    }

    // Prevent duplicate application
    const alreadyApplied = await JobApplication.findOne({ jobId, userId });
    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied for this job" });
    }

    const application = await JobApplication.create({
      jobId,
      userId,
      name,
      email,
      phone,
    });

    await sendJobApplyEmail({
      to: req.body.email,
      name: req.body.name,
      job,
    });

    res.json({
      message: "Job application submitted successfully",
      application
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// USER: View My Job Applications
export const getMyJobApplications = async (req, res) => {
  try {
  const applications = await Job.find({
      createdBy: req.user.id   // ✅ THIS IS THE KEY
    }).sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ADMIN: View Applications for a Job
export const getApplicationsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await JobApplication.find({ jobId })
      .populate("userId", "name email phone createdAt");

    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



