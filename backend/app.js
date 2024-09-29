import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import { protect } from "./middleware/authMiddleware.js";

dotenv.config();

// Connect to MongoDB
connectDatabase();

const app = express();

// Middleware to parse JSON
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/notes", protect, noteRoutes);

// Make the port 5000 accessible and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
