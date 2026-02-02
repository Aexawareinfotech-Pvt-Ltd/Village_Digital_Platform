import Notification from "../../models/Notification/Notification.js";

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .sort({ createdAt: -1 });

    res.json({ success: true, data: notifications });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Add this new function to create notifications
export const createNotification = async (req, res) => {
  try {
    const { title, message, type, path } = req.body;

    const notification = await Notification.create({
      title,
      message,
      type,
      path,
    });

    // Emit via Socket.IO
    const io = req.app.get("io");
    if (io) {
      io.emit("notification:new", notification);
      console.log("📤 Notification sent:", title);
    }

    res.json({ success: true, data: notification });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, {
      isRead: true,
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};