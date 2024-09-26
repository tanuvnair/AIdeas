import express from "express";
import path from "path";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongodbURI = process.env.MONGODB_URI;
mongoose
    .connect(mongodbURI, {
        dbName: "AIdeas",
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((e) => {
        console.log(e);
    });

const notesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageData: {
        type: String,
        required: true,
    },
});

const Note = mongoose.model("notes", notesSchema);

const app = express();

const users = [];

// Using middleware
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));

// Setting up View Engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index", { name: "Tanuv" });
});

app.get("/add", async (req, res) => {
    Note.create({
        name: "Maths 101",
        imageData: "DOSFNSOUJDBF13123uuBUB",
    }).then(() => {
        res.send("Note added");
    });
}); 

app.get("/success", (req, res) => {
    res.render("success");
});

app.post("/contact", (req, res) => {
    console.log(req.body.name);

    users.push({ username: req.body.name, email: req.body.email });
    res.redirect("/success");
});

app.get("/users", (req, res) => {
    res.json(users);
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
