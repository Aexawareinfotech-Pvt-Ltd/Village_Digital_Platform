// import dotenv from "dotenv";
// import bcrypt from "bcryptjs";
// import axios from "axios"
// import jwt from "jsonwebtoken";
// import User from "../../models/User/Users.js";
// import crypto from "crypto";
// import sendResetEmail from "../../utils/sendResetEmail.js";
// import { registerSchema,loginSchema, resetPasswordSchema, } from "../../utils/authValidator.js";

// dotenv.config();

// const TOKEN_BYTES = 32;
// const TOKEN_EXPIRES_MIN = Number(process.env.PASSWORD_RESET_EXPIRE_MINUTES) || 60;

// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
// const LGD_API_KEY =  "579b464db66ec23bdd00000132a2335f8c054bda70fc185d8ac676a6";
// const LGD_BASE_URL = "https://api.data.gov.in/resource/c967fe8f-69c4-42df-8afc-8a2c98057437";


// async function registerUser(req, res) {
//   try {
//     const { error } = registerSchema.validate(req.body, { abortEarly: false });

//     if (error) {
//       return res.status(400).json({
//         message: "Validation failed",
//         errors: error.details.map(err => err.message)
//       });
//     }

//     const { name, phone, email, address, password } = req.body;

//     const existingUser = await User.findOne({
//       $or: [{ email }, { phone }]
//     });

//     if (existingUser) {
//       return res.status(400).json({
//         message: "User with this email or phone already exists"
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       name,
//       email,
//       phone,
//       address: address || "",
//       passwordHash: hashedPassword,
//       role: "User",
//       lastActive: new Date()
//     });

//     await newUser.save();

//     res.status(201).json({
//       message: "User registered successfully"
//     });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }

// async function loginUser(req, res) {
//   try {
//     // ✅ Joi validation
//     const { error } = loginSchema.validate(req.body);
//     if (error) {
//       return res.status(400).json({
//         message: error.details[0].message,
//       });
//     }

//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.passwordHash);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // const token = jwt.sign(
//     //   { userId: user._id, role: user.role },
//     //   JWT_SECRET,
//     //   { expiresIn: "1d" }
//     // );

//     const token = jwt.sign(
//     {
//       userId: user._id,
//       role: user.role,
//       district: user.district,
//       subDistrict: user.subDistrict,
//       village: user.village
//     },
//     process.env.JWT_SECRET,
//     { expiresIn: "1d" }
//     );


//     res.json({
//       message: "Login successful",
//       token,
//       role: user.role,
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: "Login failed",
//       error: err.message,
//     });
//   }
// }


// async function logoutUser(req, res) { 
//     return res.json({ message: "Logged out successfully" });
// };




// export const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(404).json({ message: "User not found" });

//     const resetToken = crypto.randomBytes(32).toString("hex");

//     user.resetPasswordToken = crypto
//       .createHash("sha256")
//       .update(resetToken)
//       .digest("hex");

//     user.resetPasswordExpire = new Date(Date.now() + 15 * 60 * 1000);
//     await user.save();

//     const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

//     await sendResetEmail({
//       to: user.email,
//       resetUrl,
//     });

//     res.json({ message: "Reset link sent to email" });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// export const resetPassword = async (req, res) => {
//   try {
//     const { error } = resetPasswordSchema.validate(req.body, { abortEarly: false });

//     if (error) {
//       return res.status(400).json({
//         message: "Password validation failed",
//         errors: error.details.map(err => err.message)
//       });
//     }

//     const { token } = req.params;
//     const { password } = req.body;

//     const hashedToken = crypto
//       .createHash("sha256")
//       .update(token)
//       .digest("hex");

//     const user = await User.findOne({
//       resetPasswordToken: hashedToken,
//       resetPasswordExpire: { $gt: Date.now() }
//     });

//     if (!user) {
//       return res.status(400).json({ message: "Invalid or expired token" });
//     }

//     user.passwordHash = await bcrypt.hash(password, 10);
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;

//     await user.save();

//     res.json({ message: "Password reset successful" });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // controllers/authController.js
// const getMe = (req, res) => {
//   res.status(200).json({
//     success: true,
//     user: {
//       id: req.user.id,
//       role: req.user.role,
//     },
//   });
// };

// async function getDistricts(req, res) {
//   try {
//     const state = req.query.state;
//     if (!state) {
//       return res.status(400).json({ message: "state query param is required" });
//     }

//     const url = `${LGD_BASE_URL}?api-key=${LGD_API_KEY}&format=json&filters[stateNameEnglish]=${encodeURIComponent(state)}&limit=20363&offset=0`;

//     console.log("Fetching:", url);

//     const response = await axios.get(url);

//     const records = response?.data?.records || [];

//     const districts = new Set();

//     records.forEach(r => {
//       if (r.districtNameEnglish) {
//         districts.add(r.districtNameEnglish);
//       }
//     });

//     res.json([...districts].sort());

//   } catch (err) {
//     console.error("getDistricts error:", err.message);
//     res.status(500).json({ error: err.message });
//   }
// }

// async function getTalukas(req, res) {
//   try {
//     const { state, district } = req.query;
//     if (!state || !district) return res.status(400).json({ message: "state and district query params are required" });

//     let offset = 0;
//     const limit = 100;
//     const talukas = new Set();

//     while (true) {
//       const url = `${LGD_BASE_URL}?api-key=${LGD_API_KEY}&format=json&filters[stateNameEnglish]=${encodeURIComponent(state)}&filters[districtNameEnglish]=${encodeURIComponent(district)}&limit=${limit}&offset=${offset}`;

//       const response = await axios.get(url);
//       const records = response.data.records;

//       if (!records || !records.length) break;

//       records.forEach(r => {
//         if (r.subdistrictNameEnglish) talukas.add(r.subdistrictNameEnglish);
//       });

//       offset += limit;
//     }

//     res.json([...talukas].sort());
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }

// async function getVillages(req, res) {
//   try {
//     const { state, district, taluka } = req.query;
//     if (!state || !district || !taluka) return res.status(400).json({ message: "state, district, and taluka query params are required" });

//     let offset = 0;
//     const limit = 100;
//     const villages = [];

//     while (true) {
//       const url = `${LGD_BASE_URL}?api-key=${LGD_API_KEY}&format=json&filters[stateNameEnglish]=${encodeURIComponent(state)}&filters[districtNameEnglish]=${encodeURIComponent(district)}&filters[subdistrictNameEnglish]=${encodeURIComponent(taluka)}&limit=${limit}&offset=${offset}`;

//       const response = await axios.get(url);
//       const records = response.data.records;

//       if (!records || !records.length) break;

//       villages.push(...records.map(r => r.villageNameEnglish).filter(Boolean));
//       offset += limit;
//     }

//     res.json(villages.sort());
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }

// export { registerUser, loginUser, logoutUser, getMe , getDistricts, getTalukas, getVillages };



import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import axios from "axios";
import jwt from "jsonwebtoken";
import User from "../../models/User/Users.js";
import crypto from "crypto";
import sendResetEmail from "../../utils/sendResetEmail.js";
import { registerSchema, loginSchema, resetPasswordSchema } from "../../utils/authValidator.js";

dotenv.config();

const TOKEN_BYTES = 32;
const TOKEN_EXPIRES_MIN = Number(process.env.PASSWORD_RESET_EXPIRE_MINUTES) || 60;

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
const LGD_API_KEY = "579b464db66ec23bdd00000132a2335f8c054bda70fc185d8ac676a6";
const LGD_BASE_URL = "https://api.data.gov.in/resource/c967fe8f-69c4-42df-8afc-8a2c98057437";


async function registerUser(req, res) {
  try {
    const { error } = registerSchema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.details.map(err => err.message),
      });
    }

    // ✅ Destructure location fields sent from the frontend
    const { name, phone, email, address, password,  district, subDistrict, village } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User with this email or phone already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      phone,
      address: address || "",
      // ✅ Store location fields separately so JWT can include them at login
      district: district || "",
      subDistrict: subDistrict || "",
      village: village || "",
      passwordHash: hashedPassword,
      role: "User",
      lastActive: new Date(),
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function loginUser(req, res) {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ Now district, subDistrict, village are properly stored on the user document
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        district: user.district,
        subDistrict: user.subDistrict,
        village: user.village,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      role: user.role,
    });

  } catch (err) {
    res.status(500).json({
      message: "Login failed",
      error: err.message,
    });
  }
}


async function logoutUser(req, res) {
  return res.json({ message: "Logged out successfully" });
}


export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpire = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await sendResetEmail({
      to: user.email,
      resetUrl,
    });

    res.json({ message: "Reset link sent to email" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const resetPassword = async (req, res) => {
  try {
    const { error } = resetPasswordSchema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        message: "Password validation failed",
        errors: error.details.map(err => err.message),
      });
    }

    const { token } = req.params;
    const { password } = req.body;

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.passwordHash = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getMe = (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      id: req.user.id,
      role: req.user.role,
    },
  });
};


async function getDistricts(req, res) {
  try {
    const state = req.query.state;
    if (!state) {
      return res.status(400).json({ message: "state query param is required" });
    }

    const url = `${LGD_BASE_URL}?api-key=${LGD_API_KEY}&format=json&filters[stateNameEnglish]=${encodeURIComponent(state)}&limit=20363&offset=0`;

    console.log("Fetching:", url);

    const response = await axios.get(url);

    const records = response?.data?.records || [];

    const districts = new Set();

    records.forEach(r => {
      if (r.districtNameEnglish) {
        districts.add(r.districtNameEnglish);
      }
    });

    res.json([...districts].sort());

  } catch (err) {
    console.error("getDistricts error:", err.message);
    res.status(500).json({ error: err.message });
  }
}


async function getTalukas(req, res) {
  try {
    const { state, district } = req.query;
    if (!state || !district) return res.status(400).json({ message: "state and district query params are required" });

    let offset = 0;
    const limit = 100;
    const talukas = new Set();

    while (true) {
      const url = `${LGD_BASE_URL}?api-key=${LGD_API_KEY}&format=json&filters[stateNameEnglish]=${encodeURIComponent(state)}&filters[districtNameEnglish]=${encodeURIComponent(district)}&limit=${limit}&offset=${offset}`;

      const response = await axios.get(url);
      const records = response.data.records;

      if (!records || !records.length) break;

      records.forEach(r => {
        if (r.subdistrictNameEnglish) talukas.add(r.subdistrictNameEnglish);
      });

      offset += limit;
    }

    res.json([...talukas].sort());

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


async function getVillages(req, res) {
  try {
    const { state, district, taluka } = req.query;
    if (!state || !district || !taluka) return res.status(400).json({ message: "state, district, and taluka query params are required" });

    let offset = 0;
    const limit = 100;
    const villages = [];

    while (true) {
      const url = `${LGD_BASE_URL}?api-key=${LGD_API_KEY}&format=json&filters[stateNameEnglish]=${encodeURIComponent(state)}&filters[districtNameEnglish]=${encodeURIComponent(district)}&filters[subdistrictNameEnglish]=${encodeURIComponent(taluka)}&limit=${limit}&offset=${offset}`;

      const response = await axios.get(url);
      const records = response.data.records;

      if (!records || !records.length) break;

      villages.push(...records.map(r => r.villageNameEnglish).filter(Boolean));
      offset += limit;
    }

    res.json(villages.sort());

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


export { registerUser, loginUser, logoutUser, getMe, getDistricts, getTalukas, getVillages };