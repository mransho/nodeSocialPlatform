import User from "../models/user.model.js";

export const signup = async (req, res) => {
    try {
        const { email, password, firstName, lastName, dateOfBirth } = req.body;

        if (!email || !password || !firstName || !lastName || !dateOfBirth) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const newUser = new User({ email, password, firstName, lastName, dateOfBirth });
        await newUser.save();

        res.status(200).json({ message: "User registered successfully", user: newUser });

    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ message: "Server error" });
    }
};
