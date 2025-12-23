import express from "express";
import connectDB from "./config/db.js";
import newsRoutes from "./routes/News.js";

connectDB();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/news", newsRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
