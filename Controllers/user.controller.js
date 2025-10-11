import User from "../models/user.model.js";
import bcrypt from 'bcrypt';

const signup = async (req, res) => {
  try {
    let { email, password, firstName, lastName, dateOfBirth } = req.body;

    if (!email || !password || !firstName || !lastName || !dateOfBirth) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const SALT_ROUNDS = 12;
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    let hashPassword = await bcrypt.hash(password, salt)

    const newUser = new User({ email, password: hashPassword, firstName, lastName, dateOfBirth });
    await newUser.save();

    const userResponse = newUser.toObject();
    delete userResponse.password;
    delete userResponse.dateOfBirth;

    res.status(200).json({ message: "User registered successfully", user: userResponse });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      message: "Login successful",
      user: userResponse,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export default {
  signup,
  login,
};