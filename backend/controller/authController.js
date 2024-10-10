import User from "../models/userModel.js";
import bcrpyt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Credentials cannot be empty" });
        }

        const hashedPassword = await bcrpyt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Credentials cannot be empty" });
        }
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrpyt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
