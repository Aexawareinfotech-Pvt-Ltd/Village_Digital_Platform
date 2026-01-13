// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import http from "http";
// import { Server } from "socket.io";

// // Load env
// dotenv.config();

// // App
// const app = express();
// const PORT = process.env.PORT || 3000;

// // Create HTTP server (REQUIRED for Socket.IO)
// const server = http.createServer(app);

// // Socket.IO setup
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     credentials: true,
//   },
// });

// // Make io available in controllers
// app.set("io", io);

// // Socket events
// io.on("connection", (socket) => {
//   console.log("🟢 Admin connected:", socket.id);

//   socket.on("disconnect", () => {
//     console.log("🔴 Admin disconnected:", socket.id);
//   });
// });



// // Middlewares
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

// app.use(express.json());

// // Database
// import connectDB from "./config/db.js";
// connectDB();

// // Routes
// import userRoutes from "./routes/User.js";
// import adminRoutes from "./routes/Admin.js";
// import jobRoutes from "./routes/Job.js";
// import newsRoutes from "./routes/News.js";
// import grievanceRoutes from "./routes/Grievance.js";

// app.use(express.json());

// // Routes imports
// import userRoutes from "./routes/User/User.js";
// import adminRoutes from "./routes/Admin/Admin.js";
// import jobRoutes from "./routes/Job/Job.js";
// import newsRoutes from "./routes/News/News.js";
// import cropAdvisoryRoutes from "./routes/Agriculture/CropAdvisory.js";
// import governmentSchemesRoutes from "./routes/Agriculture/GovernmentSchemes.js";  
// import soilTestingRoutes from "./routes/Agriculture/SoilTesting.js";
// import irrigationRoutes from "./routes/Agriculture/Irrigation.js";

// // Routes usage
// app.use("/api/users", userRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/jobs", jobRoutes);
// app.use("/api/news", newsRoutes);
// app.use("/api/agriculture/crop-advisory", cropAdvisoryRoutes);
// app.use("/api/agriculture/government-schemes", governmentSchemesRoutes);
// app.use("/api/agriculture/soil-testing", soilTestingRoutes);
// app.use("/api/agriculture/irrigation", irrigationRoutes);

// // Test route
// app.get("/", (req, res) => {
//   res.send("Backend is running 🚀");
// });

// // Start server
// server.listen(PORT, () => {
//   console.log(`✅ Server running at http://localhost:${PORT}`);
// });


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
    origin: "http://localhost:5173",
    credentials: true,
  },
});

// Make io available in controllers
app.set("io", io);

// Socket events
io.on("connection", (socket) => {
  console.log("🟢 Admin connected:", socket.id);

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

// ✅ ROUTE IMPORTS (ONLY ONCE)
import userRoutes from "./routes/User/User.js";
import adminRoutes from "./routes/Admin/Admin.js";
import jobRoutes from "./routes/Job/Job.js";
import newsRoutes from "./routes/News/News.js";
import cropAdvisoryRoutes from "./routes/Agriculture/CropAdvisory.js";
import governmentSchemesRoutes from "./routes/Agriculture/GovernmentSchemes.js";
import soilTestingRoutes from "./routes/Agriculture/SoilTesting.js";
import irrigationRoutes from "./routes/Agriculture/Irrigation.js";
import eventRoutes from "./routes/Event/event.js";
import eventRegistrationRoutes from "./routes/Event/registration.js";


// Routes usage
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/agriculture/crop-advisory", cropAdvisoryRoutes);
app.use("/api/agriculture/government-schemes", governmentSchemesRoutes);
app.use("/api/agriculture/soil-testing", soilTestingRoutes);
app.use("/api/agriculture/irrigation", irrigationRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/event-registrations", eventRegistrationRoutes);


// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Start server
server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
