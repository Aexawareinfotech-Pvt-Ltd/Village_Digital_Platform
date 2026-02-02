import LocalService from "../../models/LocalServices/LocalServices.js";
import Notification from "../../models/Notification/Notification.js"; 

/* =====================================================
   CREATE LOCAL SERVICE (ADMIN)
===================================================== */
export const createLocalService = async (req, res) => {
  try {
    const service = await LocalService.create({
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      hours: req.body.hours,
      services: req.body.services,
      category: req.body.category,
      createdBy: req.user.userId,
    });

    const notification = await Notification.create({
      title: "New Local Service Added",
      message: `Local Service ${service.name} has been added.`,
      type: "localService",
      path: "Service/",
    });

    const io = req.app.get("io");
    io.emit("newNotification", notification);

    res.status(201).json({
      success: true,
      data: service,
    });
  } catch (err) {
    console.error("Create Local Service Error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* =====================================================
   GET ALL LOCAL SERVICES (PUBLIC)
===================================================== */
export const getLocalServices = async (req, res) => {
  try {
    const services = await LocalService.find()
      .sort({ createdAt: -1 });

    res.json(services);
  } catch (err) {
    console.error("Fetch Local Services Error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* =====================================================
   UPDATE LOCAL SERVICE (ADMIN)
===================================================== */
export const updateLocalService = async (req, res) => {
  try {
    const service = await LocalService.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Local service not found",
      });
    }

    service.name = req.body.name ?? service.name;
    service.phone = req.body.phone ?? service.phone;
    service.address = req.body.address ?? service.address;
    service.hours = req.body.hours ?? service.hours;
    service.services = req.body.services ?? service.services;
    service.category = req.body.category ?? service.category;

    await service.save();

    res.json({
      success: true,
      data: service,
    });
  } catch (err) {
    console.error("Update Local Service Error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* =====================================================
   DELETE LOCAL SERVICE (ADMIN)
===================================================== */
export const deleteLocalService = async (req, res) => {
  try {
    const service = await LocalService.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Local service not found",
      });
    }

    await service.deleteOne();

    res.json({
      success: true,
      message: "Local service deleted successfully",
    });
  } catch (err) {
    console.error("Delete Local Service Error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
