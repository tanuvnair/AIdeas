import User from "../models/userModel";
import bcrpyt from "bcryptjs";
import jwt from "jwt";

export const signUp = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            // Returns 400 Bad Request
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrpyt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        // Returns 201 Created
        res.status(201).json({ message: "User registered" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrpyt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiredIn: "1h",
        });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
