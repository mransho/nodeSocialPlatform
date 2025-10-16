import User from "../models/user.js";
import bcrypt from 'bcrypt';
import generateJWT from "../utils/generateJWT.js"

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

    const token = await generateJWT({ email: newUser.email, id: newUser._id })
    newUser.token = token

    await newUser.save();

    res.status(200).json({
      message: "User registered successfully",
      user: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
      token
    });
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

    const token = await generateJWT({ email: user.email, id: user._id })


    res.status(200).json({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


export default {
  signup,
  login,
};