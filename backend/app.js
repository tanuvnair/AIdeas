import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/db.js";

dotenv.config();

// Connect to MongoDB
connectDatabase();

const app = express();

// Middleware to parse JSON
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
