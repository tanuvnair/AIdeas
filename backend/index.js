import express from "express";
import path from "path";

const app = express();

app.use(express.static(path.join(path.resolve(), "public")));

// Setting up View Engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index", { name: "Tanuv" });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
