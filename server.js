import express from "express";
import mongoose from "mongoose";
// re fix pnpm

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
  email: String,
  password: String,
  firstName: String,
  firstName: String,
  dateOfBirth: String
}))

app.post("/signup", async (req, res) => {
  try {
    const { email, password, firstName, lastName, dateOfBirth } = req.body;

    // ✅ التحقق إن البيانات موجودة
    if (!email || !password || !firstName || !lastName || !dateOfBirth) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ التحقق إن المستخدم مش موجود قبل كده
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // ✅ إنشاء مستخدم جديد
    const newUser = new User({ email, password, firstName, lastName, dateOfBirth });
    await newUser.save();

    // ✅ الرد بنجاح
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
