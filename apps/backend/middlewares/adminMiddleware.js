import authMiddleware from "./authMiddleware.js";

const adminMiddleware = (req, res, next) => {
 
  authMiddleware(req, res, () => {

    const user = req.user;
    
    if (!user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (user.role !== "Admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    next();
  });
};

export default adminMiddleware;

