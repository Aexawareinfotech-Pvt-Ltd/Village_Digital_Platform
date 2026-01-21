import Job from "../../models/Job/Job.js";
import JobApplication from "../../models/Job/JobApplication.js";

// USER: Apply for Job
export const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    console.log("Job ID:", jobId);
    console.log("User ID:", req.user.id);
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
    const applications = await JobApplication.find({
      userId: req.user.id
    })
      .populate("jobId") // ✅ populate FULL job document
      .sort({ createdAt: -1 });

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



// export const getApplicationsByJob = async (req, res) => {
//   try {
//     const { jobId } = req.params;

//     // 1️⃣ Get all applications for the job
//     const applications = await JobApplication.find({ jobId });

//     // 2️⃣ For each application, fetch user manually
//     const applicants = await Promise.all(
//       applications.map(async (app) => {
//         const user = await User.findById(app.userId);

//         return {
//           applicationId: app._id,
//           name: user ? user.name : null,
//           email: user ? user.email : null,
//           phone: app.phone,
//           status: app.status,
//           appliedAt: app.createdAt
//         };
//       })
//     );

//     // 3️⃣ Send response
//     res.json({
//       totalApplicants: applicants.length,
//       applicants
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

