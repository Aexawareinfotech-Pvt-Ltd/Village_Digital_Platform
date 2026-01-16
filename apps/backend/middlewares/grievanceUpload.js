import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "village-grievances",
    resource_type: "auto", // image + pdf + video
  },
});

const grievanceUpload = multer({ storage });

export default grievanceUpload;
