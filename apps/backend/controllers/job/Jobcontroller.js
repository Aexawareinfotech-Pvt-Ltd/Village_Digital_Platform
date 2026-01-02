import Job from "../../models/Job/Job.js";

// USER: Create Job
export const createJob = async (req, res) => {
  await Job.create({
    title: req.body.title,
    ownerName: req.body.ownerName,
    ownerContact: req.body.ownerContact,
    description: req.body.description,
    category: req.body.category,
    salary: req.body.salary,
    location: req.body.location,
    experience: req.body.experience,
    jobType: req.body.jobType,
    postedDate: req.body.postedDate,
    deadlineDate: req.body.deadlineDate,
    createdBy: req.userId
  });

  res.json({ message: "Job submitted for approval" });
};

// ADMIN: View Pending Jobs
export const getPendingJobs = async (req, res) => {
  const jobs = await Job.find({ status: "pending" });
  res.json(jobs);
};

// ADMIN: Approve Job
export const approveJob = async (req, res) => {
  await Job.findByIdAndUpdate(req.params.id, { status: "approved" });
  res.json({ message: "Job approved" });
};

// USER: View Approved Jobs
export const getApprovedJobs = async (req, res) => {
  const jobs = await Job.find({ status: "approved" });
  res.json(jobs);
};

// OWNER or ADMIN: Update Job
export const updateJob = async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (
    job.createdBy.toString() !== req.userId &&
    req.userRole !== "admin"
  ) {
    return res.status(403).json({ message: "Not allowed" });
  }

  await Job.findByIdAndUpdate(req.params.id, {
    ...req.body,
    status: "pending"
  });

  res.json({ message: "Job updated" });
};

// OWNER or ADMIN: Delete Job
export const deleteJob = async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (
    job.createdBy.toString() !== req.userId &&
    req.userRole !== "admin"
  ) {
    return res.status(403).json({ message: "Not allowed" });
  }

  await job.deleteOne();
  res.json({ message: "Job deleted" });
};
