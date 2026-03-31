import express from "express";
import cors from "cors";
import gameRoutes from "./routes/game.js";
import highscoreRoutes from "./routes/highscore.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", gameRoutes);
app.use("/api", highscoreRoutes);

app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});

app.get("/api/word", (req, res) => {
    res.json({
        word: "CYKLA"
    });
});

app.listen(5080, () => {
    console.log("Server running on http://localhost:5080");
});
