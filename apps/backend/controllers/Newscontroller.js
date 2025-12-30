import News from "../models/News.js"

// -----------------------------------------
// CREATE NEWS
// -----------------------------------------
export const createNews = async (req, res) => {
  try {
    let attachments = [];

    if (req.files && req.files.length > 0) {
      attachments = req.files.map((file) => ({
        fileName: file.originalname,
        fileUrl: file.path, // Cloudinary URL
        fileType: file.mimetype.includes("image") ? "image" : "pdf",
      }));
    }

    const news = await News.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      status: req.body.status || "published",
      publishDate: req.body.publishDate,
      expiryDate: req.body.expiryDate,
      featured: req.body.featured || false,
      attachments,
    });

    res.status(201).json({ success: true, data: news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllNews = async (req, res) => {
  try {
    const { status } = req.query;
    
    let query = {};
    if (status) {
      query.status = status;
    }

    const news = await News.find(query).sort({
      featured: -1,
      publishDate: -1,
    });

    res.json({ success: true, data: news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// -----------------------------------------
// GET SINGLE NEWS BY ID
// -----------------------------------------
export const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ success: false, message: "News not found" });
    }

    res.json({ success: true, data: news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// -----------------------------------------
// UPDATE NEWS
// -----------------------------------------
export const updateNews = async (req, res) => {
  try {
    const id = req.params.id;

    let updateData = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      status: req.body.status, // FIXED: Now properly updates status
      publishDate: req.body.publishDate,
      expiryDate: req.body.expiryDate,
      featured: req.body.featured,
    };

    // If new files uploaded → replace old
    if (req.files && req.files.length > 0) {
      updateData.attachments = req.files.map((file) => ({
        fileName: file.originalname,
        fileUrl: file.path, // Cloudinary URL
        fileType: file.mimetype.includes("image") ? "image" : "pdf",
      }));
    }

    const updated = await News.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "News not found" });
    }

    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// -----------------------------------------
// DELETE NEWS
// -----------------------------------------
export const deleteNews = async (req, res) => {
  try {
    const id = req.params.id;

    const deleted = await News.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "News not found" });
    }

    res.json({ success: true, message: "News deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};