import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    noteTitle: { type: String, required: true },
    noteData: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Note", noteSchema);
