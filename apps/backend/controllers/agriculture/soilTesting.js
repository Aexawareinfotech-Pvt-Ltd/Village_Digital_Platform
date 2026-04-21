// import SoilTestingCenter from "../../models/Agriculture/SoilTestingCenter.js";

// export const createSoilTestingCenter = async (req, res) => {
//   try {
//     const center = await SoilTestingCenter.create({   
//         name: req.body.name,
//         address: req.body.address,
//         phone: req.body.phone,  
//         testsOffered: req.body.testsOffered,
//         createdBy: req.user.id,
//     });

//     const notification = await Notification.create({
//       title: "New Soil Testing Center Added",
//       message: `Soil Testing Center ${center.name} has been added.`,
//       type: "soilTestingCenter",
//       path: "/agriculture/",
//     });

//     const io = req.app.get("io");
//     io.emit("newNotification", notification);
    
//     res.status(201).json({
//       success: true,
//       data: center,
//     });
//   } catch (error) {
//       res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   } 
// };

// export const getAllSoilTestingCenters = async (req, res) => {
//   try {
//     const centers = await SoilTestingCenter.find().sort({ createdAt: -1 });   
//     res.json({
//        success: true,
//        data: centers,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,   
//       message: error.message,
//     });
//   }
// };


// export const updateSoilTestingCenter = async (req, res) => {
//   try {
//     const center = await SoilTestingCenter.findByIdAndUpdate(
//       req.params.id,
//       {
//         name: req.body.name,
//         address: req.body.address,
//         phone: req.body.phone,
//         testsOffered: req.body.testsOffered,
//       },
//       { new: true } // return updated document
//     );

//     if (!center) {
//       return res.status(404).json({
//         success: false,
//         message: "Soil Testing Center not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: center,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


// export const deleteSoilTestingCenter = async (req, res) => {
//   try {
//     const center = await SoilTestingCenter.findByIdAndDelete(req.params.id);

//     if (!center) {
//       return res.status(404).json({
//         success: false,
//         message: "Soil Testing Center not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Soil Testing Center deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


// export const getSoilTestingCenterById = async (req, res) => {
//   try {
//     const center = await SoilTestingCenter.findById(req.params.id);   
//     if (!center) {
//         return res.status(404).json({
//             success: false, 
//             message: "Soil Testing Center not found",     
//         });
//     }   
//     res.json({
//         success: true,
//         data: center,
//     });
//     } catch (error) {
//     res.status(500).json({
//         success: false, 
//         message: error.message,     
//     });
//   }
// };

import SoilTestingCenter from "../../models/Agriculture/SoilTestingCenter.js";
import Notification from "../../models/Notification/Notification.js";

export const createSoilTestingCenter = async (req, res) => {
  try {
    const center = await SoilTestingCenter.create({
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      testsOffered: req.body.testsOffered,

      district: req.user.district,
      subDistrict: req.user.subDistrict,
      village: req.user.village,

      createdBy: req.user.id,
    });

    const notification = await Notification.create({
      title: "New Soil Testing Center Added",
      message: `Soil Testing Center ${center.name} has been added.`,
      type: "soilTestingCenter",
      path: "/agriculture/",
      district: req.user.district,
      subDistrict: req.user.subDistrict,
      village: req.user.village,
    });

    const io = req.app.get("io");
    io.emit("newNotification", notification);

    res.status(201).json({
      success: true,
      data: center,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getAllSoilTestingCenters = async (req, res) => {
  try {

    const centers = await SoilTestingCenter.find({
      village: req.user.village
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: centers,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateSoilTestingCenter = async (req, res) => {
  try {

    const center = await SoilTestingCenter.findOneAndUpdate(
      {
        _id: req.params.id,
        village: req.user.village
      },
      {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        testsOffered: req.body.testsOffered,
      },
      { new: true }
    );

    if (!center) {
      return res.status(404).json({
        success: false,
        message: "Soil Testing Center not found",
      });
    }

    res.status(200).json({
      success: true,
      data: center,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteSoilTestingCenter = async (req, res) => {
  try {

    const center = await SoilTestingCenter.findOneAndDelete({
      _id: req.params.id,
      village: req.user.village
    });

    if (!center) {
      return res.status(404).json({
        success: false,
        message: "Soil Testing Center not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Soil Testing Center deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getSoilTestingCenterById = async (req, res) => {
  try {

    const center = await SoilTestingCenter.findOne({
      _id: req.params.id,
      village: req.user.village
    });

    if (!center) {
      return res.status(404).json({
        success: false,
        message: "Soil Testing Center not found",
      });
    }

    res.json({
      success: true,
      data: center,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};