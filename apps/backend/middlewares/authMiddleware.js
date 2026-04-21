// import jwt from "jsonwebtoken";

// const authMiddleware = (req, res, next) => {
//   const token = req.header("Authorization")?.split(" ")[1];

//   if (!token)
//     return res.status(401).json({ message: "Access denied. No token provided." });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // normalize user
//     req.user = {
//       id: decoded.userId,
//       role: decoded.role
//     };

//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

// export default authMiddleware;

import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {

  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Access denied. No token provided."
    });
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // store full user info from token
    req.user = {
      id: decoded.userId,
      role: decoded.role,
      district: decoded.district || null,
      subDistrict: decoded.subDistrict || null,
      village: decoded.village || null
    };

    next();

  } catch (err) {

    return res.status(401).json({
      message: "Invalid or expired token"
    });

  }
};

export default authMiddleware;