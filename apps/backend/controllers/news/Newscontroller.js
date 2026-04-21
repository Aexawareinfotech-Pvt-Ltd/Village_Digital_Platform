// import News from "../../models/News/News.js"
// import Notification from "../../models/Notification/Notification.js";

// // -----------------------------------------
// // CREATE NEWS
// // -----------------------------------------
// export const createNews = async (req, res) => {
//   try {
//     let attachments = [];

//     if (req.files && req.files.length > 0) {
//       attachments = req.files.map((file) => ({
//         fileName: file.originalname,
//         fileUrl: file.path, // Cloudinary URL
//         fileType: file.mimetype.includes("image") ? "image" : "pdf",
//       }));
//     }

//     const news = await News.create({
//       title: req.body.title,
//       description: req.body.description,
//       district: req.user.district,
//       subDistrict: req.user.subDistrict,
//       village: req.user.village,
//       category: req.body.category,
//       status: req.body.status || "published",
//       publishDate: req.body.publishDate,
//       expiryDate: req.body.expiryDate,
//       featured: req.body.featured || false,
//       attachments,
//     });

//       const notification = await Notification.create({
//       title: "New News Published",
//       message: news.title,
//       type: "news",
//       path: "/news",
//     });

//     const io = req.app.get("io");
//     io.emit("news:count:update");
//     io.emit("notification", notification);

//     res.status(201).json({ success: true, data: news });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const getAllNews = async (req, res) => {
//   try {
//     const { status } = req.query;
    
//     let query = {};
//     if (status) {
//       query.status = status;
//     }

//     const news = await News.find(query).sort({
//       featured: -1,
//       publishDate: -1,
//     });

//     res.json({ success: true, data: news });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // -----------------------------------------
// // GET SINGLE NEWS BY ID
// // -----------------------------------------
// export const getNewsById = async (req, res) => {
//   try {
//     const news = await News.findById(req.params.id);

//     if (!news) {
//       return res.status(404).json({ success: false, message: "News not found" });
//     }

//     res.json({ success: true, data: news });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // -----------------------------------------
// // UPDATE NEWS
// // -----------------------------------------
// export const updateNews = async (req, res) => {
//   try {
//     const id = req.params.id;

//     let updateData = {
//       title: req.body.title,
//       description: req.body.description,
//       category: req.body.category,
//       status: req.body.status, // FIXED: Now properly updates status
//       publishDate: req.body.publishDate,
//       expiryDate: req.body.expiryDate,
//       featured: req.body.featured,
//     };

//     // If new files uploaded → replace old
//     if (req.files && req.files.length > 0) {
//       updateData.attachments = req.files.map((file) => ({
//         fileName: file.originalname,
//         fileUrl: file.path, // Cloudinary URL
//         fileType: file.mimetype.includes("image") ? "image" : "pdf",
//       }));
//     }

//     const updated = await News.findByIdAndUpdate(
//       id,
//       updateData,
//       { new: true }
//     );

//     if (!updated) {
//       return res.status(404).json({ success: false, message: "News not found" });
//     }

//     res.json({ success: true, data: updated });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // -----------------------------------------
// // DELETE NEWS
// // -----------------------------------------
// export const deleteNews = async (req, res) => {
//   try {
//     const id = req.params.id;

//     const deleted = await News.findByIdAndDelete(id);

//     if (!deleted) {
//       return res.status(404).json({ success: false, message: "News not found" });
//     }
//     const io = req.app.get("io");
//     io.emit("news:count:update");
//     res.json({ success: true, message: "News deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const getNewsCount = async (req,res) => {
//   try {
//     const totalN = await News.countDocuments({});
//     res.json({ totalN });
//   } catch (error) {
//     console.error("Error fetching news count:", error);
//     res.status(500).json({ message: "Failed to fetch news count" });
//   }

// };


// export const getCategoryAnalytics = async (req, res) => {
//   try {
//     const data = await News.aggregate([
//       {
//         $group: {
//           _id: "$category",
//           count: { $sum: 1 }
//         }
//       },
//       {
//         $project: {
//           category: "$_id",
//           count: 1,
//           _id: 0
//         }
//       }
//     ]);

//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


import News from "../../models/News/News.js";
import Notification from "../../models/Notification/Notification.js";

/* -----------------------------------------
   CREATE NEWS
----------------------------------------- */
export const createNews = async (req, res) => {
  try {
    let attachments = [];

    if (req.files && req.files.length > 0) {
      attachments = req.files.map((file) => ({
        fileName: file.originalname,
        fileUrl: file.path,
        fileType: file.mimetype.includes("image") ? "image" : "pdf",
      }));
    }

    const news = await News.create({
      title: req.body.title,
      description: req.body.description,
      district: req.user.district,
      subDistrict: req.user.subDistrict,
      village: req.user.village,
      category: req.body.category,
      status: req.body.status || "published",
      publishDate: req.body.publishDate,
      expiryDate: req.body.expiryDate,
      featured: req.body.featured || false,
      attachments,
    });

    /* ✅ ADD LOCATION HERE */
    const notification = await Notification.create({
      title: "New News Published",
      message: news.title,
      type: "news",
      path: "/news",

      district: req.user.district,
      subDistrict: req.user.subDistrict,
      village: req.user.village,
    });

    const io = req.app.get("io");
    io.emit("news:count:update");
    io.emit("notification", notification);

    res.status(201).json({ success: true, data: news });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/* -----------------------------------------
   GET ALL NEWS (Village Based)
----------------------------------------- */
export const getAllNews = async (req, res) => {
  try {

    const { status } = req.query;

    const query = {
      village: req.user.village
    };

    if (status) {
      query.status = status;
    }

    const news = await News.find(query).sort({
      featured: -1,
      publishDate: -1
    });

    res.json({ success: true, data: news });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/* -----------------------------------------
   GET SINGLE NEWS
----------------------------------------- */
export const getNewsById = async (req, res) => {
  try {

    const news = await News.findOne({
      _id: req.params.id,
      village: req.user.village
    });

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found"
      });
    }

    res.json({ success: true, data: news });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/* -----------------------------------------
   UPDATE NEWS
----------------------------------------- */
export const updateNews = async (req, res) => {
  try {

    const id = req.params.id;

    let updateData = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      status: req.body.status,
      publishDate: req.body.publishDate,
      expiryDate: req.body.expiryDate,
      featured: req.body.featured,
    };

    if (req.files && req.files.length > 0) {
      updateData.attachments = req.files.map((file) => ({
        fileName: file.originalname,
        fileUrl: file.path,
        fileType: file.mimetype.includes("image") ? "image" : "pdf",
      }));
    }

    const updated = await News.findOneAndUpdate(
      {
        _id: id,
        village: req.user.village
      },
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "News not found"
      });
    }

    res.json({ success: true, data: updated });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/* -----------------------------------------
   DELETE NEWS
----------------------------------------- */
export const deleteNews = async (req, res) => {
  try {

    const deleted = await News.findOneAndDelete({
      _id: req.params.id,
      village: req.user.village
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "News not found"
      });
    }

    const io = req.app.get("io");
    io.emit("news:count:update");

    res.json({
      success: true,
      message: "News deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/* -----------------------------------------
   NEWS COUNT (Village Based)
----------------------------------------- */
export const getNewsCount = async (req, res) => {
  try {

    const totalN = await News.countDocuments({
      village: req.user.village
    });

    res.json({ totalN });

  } catch (error) {
    console.error("Error fetching news count:", error);
    res.status(500).json({ message: "Failed to fetch news count" });
  }
};


/* -----------------------------------------
   CATEGORY ANALYTICS (Village Based)
----------------------------------------- */
export const getCategoryAnalytics = async (req, res) => {
  try {

    const data = await News.aggregate([
      {
        $match: {
          village: req.user.village
        }
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          category: "$_id",
          count: 1,
          _id: 0
        }
      }
    ]);

    res.json(data);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};