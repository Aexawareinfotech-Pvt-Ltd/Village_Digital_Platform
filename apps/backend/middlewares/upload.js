import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "village-news",  // Cloud folder name
    resource_type: "auto",   // auto supports pdf + images
  },
});

const upload = multer({ storage });

export default upload;
