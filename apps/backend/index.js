import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use("/api/news", newsRoutes);


import newsRoutes from "./routes/News.js";
app.use("/api/news", newsRoutes);

connectDB();

// Routes
import userRoutes from "./routes/User.js";
app.use("/api/users", userRoutes);

import adminRoutes from "./routes/Admin.js";
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});


