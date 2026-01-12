
import Irrigation from "../../models/Agriculture/Irrigation.js";

export const createIrrigationGuide = async (req, res) => {
  try {
    const guide = await Irrigation.create({
        cropName: req.body.cropName,
        timing: req.body.timing,
        waterQuantity: req.body.waterQuantity,  
        specialAlert: req.body.specialAlert,
        createdBy: req.user.id,
    });
    res.status(201).json({
      success: true,
      data: guide,
    });
  } catch (error) {
      res.status(500).json({
      success: false,   
      message: error.message, 
    });
  } 
};

export const getAllIrrigationGuides = async (req, res) => {     
    try {   
    const guides = await Irrigation.find().sort({ createdAt: -1 });   
    res.json({
       success: true,
       data: guides,
    });
  } catch (error) {
    res.status(500).json({
       success: false,
       message: error.message, 
    });
  } 
};

export const updateIrrigationGuide = async (req, res) => {
  try {
    const guide = await Irrigation.findByIdAndUpdate(
      req.params.id,
      {
        cropName: req.body.cropName,
        timing: req.body.timing,
        waterQuantity: req.body.waterQuantity,
        specialAlert: req.body.specialAlert,
      },
      { new: true } // return updated document
    );

    if (!guide) {
      return res.status(404).json({
        success: false,
        message: "Irrigation guide not found",
      });
    }

    res.status(200).json({
      success: true,
      data: guide,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteIrrigationGuide = async (req, res) => {
  try {
    const irrigation = await Irrigation.findByIdAndDelete(req.params.id);

    if (!irrigation) {
      return res.status(404).json({
        success: false,
        message: "Irrigation guide not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Irrigation guide deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getIrrigationGuideById = async (req, res) => {
  try {
    const guide = await Irrigation.findById(req.params.id); 
    if (!guide) {
        return res.status(404).json({
            success: false, 
            message: "Irrigation guide not found",
        });
    }   
    res.json({
        success: true,
        data: guide,
    });
    } catch (error) {
    res.status(500).json({
        success: false,     
        message: error.message,
    });
  } 
};