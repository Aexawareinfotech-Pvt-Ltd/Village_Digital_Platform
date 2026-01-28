import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

// Load env
dotenv.config();

// App
const app = express();
const PORT = process.env.PORT || 3000;

// Create HTTP server
const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "*",
    //credentials: true,
  },
});

// Make io available in controllers
app.set("io", io);

// Socket events
io.on("connection", (socket) => {
  console.log("🟢 Admin connected:", socket.id);

  socket.on("join-receipt", (receiptId) => {
    socket.join(receiptId);
    console.log(`📦 Joined receipt room: ${receiptId}`);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Admin disconnected:", socket.id);
  });
});

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
console.log("MONGO_URI USED =", process.env.MONGO_URI);

// Database
import connectDB from "./config/db.js";
connectDB();

// Routes


// ✅ ROUTE IMPORTS (ONLY ONCE)
import userRoutes from "./routes/User/User.js";
import userProfileRoutes from "./routes/User/UserProfile.js";
import adminRoutes from "./routes/Admin/Admin.js";
import jobRoutes from "./routes/Job/Job.js";
import jobApplicationRoutes from "./routes/Job/jobApplication.js";
import governmentJobRoutes from "./routes/Job/governmentJob.js";
import grievanceRoutes from "./routes/Grievance/Grievance.js";
import marketplaceRoutes from "./routes/Marketplace/Marketplace.js";
import paymentRoutes from "./routes/Payment/Payment.js";
import localServiceRoutes from "./routes/LocalServices/LocalServices.js";
import newsRoutes from "./routes/News/News.js";
import cropAdvisoryRoutes from "./routes/Agriculture/CropAdvisory.js";
import governmentSchemesRoutes from "./routes/Agriculture/GovernmentSchemes.js";
import soilTestingRoutes from "./routes/Agriculture/SoilTesting.js";
import irrigationRoutes from "./routes/Agriculture/Irrigation.js";
import eventRoutes from "./routes/Event/event.js";
import eventRegistrationRoutes from "./routes/Event/registration.js";
import path from "path";
import { fileURLToPath } from "url";

// Routes usage
app.use("/api/users", userRoutes);
app.use("/api/profile", userProfileRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/job-applications", jobApplicationRoutes);
app.use("/api/government-jobs", governmentJobRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/grievances", grievanceRoutes);
app.use("/api/marketplace", marketplaceRoutes);
app.use("/api/marketplace", marketplaceRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/local-services", localServiceRoutes);
app.use("/api/agriculture/crop-advisory", cropAdvisoryRoutes);
app.use("/api/agriculture/government-schemes", governmentSchemesRoutes);
app.use("/api/agriculture/soil-testing", soilTestingRoutes);
app.use("/api/agriculture/irrigation", irrigationRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/event-registrations", eventRegistrationRoutes);



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Start server
server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
