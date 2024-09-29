import Note from "../models/noteModel.js";

export const createNote = async (req, res) => {
    const { noteTitle, noteData } = req.body;

    try {
        const note = new Note({
            user: req.user._id,
            noteTitle,
            noteData,
        });

        await note.save();
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllNotes = async (req, res) => {
    try {
        const userId = req.user._id;
        const notes = await Note.find({ user: userId });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const note = await Note.findOneAndUpdate(
            { _id: id, user: userId },
            req.body,
            { new: true, runValidators: true }
        );

        if (!note) {
            return res.status(404).json({
                message:
                    "Note not found or you do not have permission to edit it.",
            });
        }

        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const note = await Note.findOneAndDelete({ _id: id, user: userId });

        if (!note) {
            return res.status(404).json({
                message:
                    "Note not found or you do not have permission to delete it.",
            });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
