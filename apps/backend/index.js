import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables
dotenv.config();

// App & Port
const app = express();
const PORT = process.env.PORT || 3000;

// Database
import connectDB from "./config/db.js";
connectDB();

// Middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

// Routes imports
import userRoutes from "./routes/User/User.js";
import adminRoutes from "./routes/Admin/Admin.js";
import jobRoutes from "./routes/Job/Job.js";
import newsRoutes from "./routes/News/News.js";
import cropAdvisoryRoutes from "./routes/Agriculture/CropAdvisory.js";
import governmentSchemesRoutes from "./routes/Agriculture/GovernmentSchemes.js";  
import soilTestingRoutes from "./routes/Agriculture/SoilTesting.js";
import irrigationRoutes from "./routes/Agriculture/Irrigation.js";

// Routes usage
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/agriculture/crop-advisory", cropAdvisoryRoutes);
app.use("/api/agriculture/government-schemes", governmentSchemesRoutes);
app.use("/api/agriculture/soil-testing", soilTestingRoutes);
app.use("/api/agriculture/irrigation", irrigationRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Server start
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
