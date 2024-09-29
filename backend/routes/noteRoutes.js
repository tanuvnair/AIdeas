import express from "express";
import {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote,
} from "../controller/noteController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createNote);
router.get("/", protect, getAllNotes);
router.get("/:id", protect, getNoteById);
router.put("/:id", protect, updateNote);
router.delete(":/id", protect, deleteNote);

export default router;
