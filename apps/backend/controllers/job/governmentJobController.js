import GovernmentJob from "../../models/Job/GovernmentJob.js";
import Notification from "../../models/Notification/Notification.js";

export const createGovernmentJob = async (req, res) => {
  try {
    
    const job = await GovernmentJob.create({
      title: req.body.title,
      applicationLink: req.body.applicationLink,
      description: req.body.description,
      category: req.body.category,
      jobType: req.body.jobType,
      location: req.body.location,
      salary: req.body.salary,
      experience: req.body.experience,
      deadlineDate: req.body.deadlineDate,
      isActive: true,
      createdBy: req.user.id,
    });

    const notification = await Notification.create({
      title: "New Government Job Posted",
      message: `Government Job ${job.title} has been posted.`,
      type: "governmentJob",
      path: "/Job",
    });

    const io = req.app.get("io");
    io.emit("newNotification", notification);

    res.status(201).json({
      success: true,
      data: job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getAllGovernmentJobs = async (req, res) => {
  try {
    const jobs = await GovernmentJob.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getGovernmentJobById = async (req, res) => {
  try {
    const job = await GovernmentJob.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Government job not found",
      });
    }

    res.json({
      success: true,
      data: job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateGovernmentJob = async (req, res) => {
  try {
    const job = await GovernmentJob.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Government job not found",
      });
    }

    res.json({
      success: true,
      data: job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteGovernmentJob = async (req, res) => {
  try {
    const job = await GovernmentJob.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Government job not found",
      });
    }

    res.json({
      success: true,
      message: "Government job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
