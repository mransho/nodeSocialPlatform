import User from "../models/user.model.js";
import bcrypt from 'bcrypt';

export const signup = async (req, res) => {
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

        res.status(200).json({ message: "User registered successfully" });

    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ message: "Server error" });
    }
};
