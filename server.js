import express from "express";
import mongoose from "mongoose";

import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT

app.use(cors());
app.use(express.json());

// connect DB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log(`http://localhost:${PORT}`))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
    
app.get("/", (req, res) => {
    res.send("Backend API is working!");
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


const User = mongoose.model("User", new mongoose.Schema({
  name: String,
  email: String,
  password: String
}))
