import CropAdvisory from "../../models/Agriculture/CropAdvisory.js";
import Notification from "../../models/Notification/Notification.js";

export const createCropAdvisory = async (req, res) => {
  try {
    const advisory = await CropAdvisory.create({
      cropName: req.body.cropName,
      season: req.body.season,
      sowingTime: req.body.sowingTime,
      seedGuidance: req.body.seedGuidance,
      fertilizerAdvice: req.body.fertilizerAdvice,
      irrigationAdvice: req.body.irrigationAdvice,
      pestControl: req.body.pestControl,
      weatherPrecaution: req.body.weatherPrecaution,
      harvesting: req.body.harvesting,
      dosAndDonts: req.body.dosAndDonts,
      isActive: req.body.isActive ?? true,
      createdBy: req.user.id,
    });

    const notification = await Notification.create({
      title: "New Crop Advisory Added",
      message: `Crop Advisory for ${advisory.cropName} has been added.`,
      type: "cropAdvisory", 
      path: "/agriculture/",
    });

    const io = req.app.get("io");
    io.emit("newNotification", notification);

    res.status(201).json({
      success: true,
      data: advisory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllCropAdvisories = async (req, res) => {
  try {
    const advisories = await CropAdvisory.find().sort({ createdAt: -1 });   
    res.json({
      success: true,
      data: advisories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,     
    });
  }     
};

export const updateCropAdvisory = async (req, res) => {
    try {
        const advisory = await CropAdvisory.findByIdAndUpdate( 
            req.params.id,
            {
                cropName: req.body.cropName,    
                season: req.body.season,
                sowingTime: req.body.sowingTime,
                seedGuidance: req.body.seedGuidance,
                fertilizerAdvice: req.body.fertilizerAdvice,
                irrigationAdvice: req.body.irrigationAdvice,
                pestControl: req.body.pestControl,
                weatherPrecaution: req.body.weatherPrecaution,
                harvesting: req.body.harvesting,
                dosAndDonts: req.body.dosAndDonts,
                isActive: req.body.isActive,
            },
            { new: true }
        );
        if (!advisory) {
            return res.status(404).json({
                success: false,
                message: "Crop Advisory not found",
            });
        }
        res.json({
            success: true,
            data: advisory,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteCropAdvisory = async (req, res) => {
  try {
    const advisory = await CropAdvisory.findByIdAndDelete(req.params.id);
    if (!advisory) {
      return res.status(404).json({
        success: false,
        message: "Crop Advisory not found",
        });
    }
    res.json({
      success: true,
      message: "Crop Advisory deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCropAdvisoryById = async (req, res) => {
  try {
    const advisory = await CropAdvisory.findById(req.params.id);    
    if (!advisory) {
        return res.status(404).json({
            success: false,
            message: "Crop Advisory not found",
        });
    }
    res.json({
        success: true,
        data: advisory,
    });
    } catch (error) {
    res.status(500).json({
        success: false,
        message: error.message,
    });
    }
};

