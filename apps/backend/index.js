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

// Create HTTP server (REQUIRED for Socket.IO)
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

// Database
import connectDB from "./config/db.js";
connectDB();

// Routes
import userRoutes from "./routes/User.js";
import adminRoutes from "./routes/Admin.js";
import jobRoutes from "./routes/Job.js";
import newsRoutes from "./routes/News.js";
import grievanceRoutes from "./routes/Grievance.js";
import marketplaceRoutes from "./routes/Marketplace.js";
import paymentRoutes from "./routes/Payment.js";
import localServiceRoutes from "./routes/LocalServices.js";


// API routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/grievances", grievanceRoutes);
app.use("/api/marketplace", marketplaceRoutes);
app.use("/api/marketplace", marketplaceRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/local-services", localServiceRoutes);


// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Start server
server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
