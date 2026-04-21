// import GovernmentSchemes from "../../models/Agriculture/GovernmentSchemes.js";
// import Notification from "../../models/Notification/Notification.js";

// export const createGovernmentScheme = async (req, res) => {
//   try {
//     const scheme = await GovernmentSchemes.create({ 
//         schemeName: req.body.schemeName,
//         benefit: req.body.benefit,
//         requiredDocuments: req.body.requiredDocuments,
//         lastDate: req.body.lastDate,
//         officialWebsite: req.body.officialWebsite,
//         applySteps: req.body.applySteps,
//         createdBy: req.user.id,
//     }); 

//     const notification = await Notification.create({
//       title: "New Government Scheme Added",
//       message: `Government Scheme ${scheme.schemeName} has been added.`,
//       type: "governmentScheme",
//       path: "/agriculture/",
//     });

//     const io = req.app.get("io");
//     io.emit("newNotification", notification);

//     res.status(201).json({
//       success: true,
//       data: scheme,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   } 
// };

// export const getAllGovernmentSchemes = async (req, res) => {
//   try {
//     const schemes = await GovernmentSchemes.find().sort({ createdAt: -1 });
//     res.json({
//       success: true,
//       data: schemes,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//         message: error.message,
//     });
//   }
// };

// export const updateGovernmentScheme = async (req, res) => {
//     try {
//         const scheme = await GovernmentSchemes.findByIdAndUpdate(
//             req.params.id,
//             {
//                 schemeName: req.body.schemeName,
//                 benefit: req.body.benefit,  
//                 requiredDocuments: req.body.requiredDocuments,
//                 lastDate: req.body.lastDate,
//                 officialWebsite: req.body.officialWebsite,
//                 applySteps: req.body.applySteps,
//             }
//         );  
//         res.status(200).json({
//             success: true,
//             data: scheme,
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };

// export const deleteGovernmentScheme = async (req, res) => {
//   try {
//     const scheme = await GovernmentSchemes.findByIdAndDelete(req.params.id);

//     if (!scheme) {
//       return res.status(404).json({
//         success: false,
//         message: "Government Scheme not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Government Scheme deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const getGovernmentSchemeById = async (req, res) => {
//   try {
//     const scheme = await GovernmentSchemes.findById(req.params.id); 
//     if (!scheme) {
//         return res.status(404).json({
//             success: false, 
//             message: "Government Scheme not found",
//         });
//     }
//     res.json({
//         success: true,
//         data: scheme,
//     });
//     } catch (error) {
//     res.status(500).json({
//         success: false, 
//         message: error.message,
//     });
//   }
// };

import GovernmentSchemes from "../../models/Agriculture/GovernmentSchemes.js";
import Notification from "../../models/Notification/Notification.js";

export const createGovernmentScheme = async (req, res) => {
  try {
    const scheme = await GovernmentSchemes.create({
      schemeName: req.body.schemeName,
      benefit: req.body.benefit,
      requiredDocuments: req.body.requiredDocuments,
      lastDate: req.body.lastDate,
      officialWebsite: req.body.officialWebsite,
      applySteps: req.body.applySteps,

      district: req.user.district,
      subDistrict: req.user.subDistrict,
      village: req.user.village,

      createdBy: req.user.id,
    });

    const notification = await Notification.create({
      title: "New Government Scheme Added",
      message: `Government Scheme ${scheme.schemeName} has been added.`,
      type: "governmentScheme",
      path: "/agriculture/",
      district: req.user.district,
      subDistrict: req.user.subDistrict,
      village: req.user.village,
    });

    const io = req.app.get("io");
    io.emit("newNotification", notification);

    res.status(201).json({
      success: true,
      data: scheme,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getAllGovernmentSchemes = async (req, res) => {
  try {

    const schemes = await GovernmentSchemes.find({
      village: req.user.village
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: schemes,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateGovernmentScheme = async (req, res) => {
  try {

    const scheme = await GovernmentSchemes.findOneAndUpdate(
      {
        _id: req.params.id,
        village: req.user.village
      },
      {
        schemeName: req.body.schemeName,
        benefit: req.body.benefit,
        requiredDocuments: req.body.requiredDocuments,
        lastDate: req.body.lastDate,
        officialWebsite: req.body.officialWebsite,
        applySteps: req.body.applySteps,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: scheme,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteGovernmentScheme = async (req, res) => {
  try {

    const scheme = await GovernmentSchemes.findOneAndDelete({
      _id: req.params.id,
      village: req.user.village
    });

    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: "Government Scheme not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Government Scheme deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getGovernmentSchemeById = async (req, res) => {
  try {

    const scheme = await GovernmentSchemes.findOne({
      _id: req.params.id,
      village: req.user.village
    });

    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: "Government Scheme not found",
      });
    }

    res.json({
      success: true,
      data: scheme,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};