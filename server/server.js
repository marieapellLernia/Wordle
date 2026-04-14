import express from "express";
import cors from "cors";
import gameRoutes from "./routes/game.js";
import highscoreRoutes from "./routes/highscore.js";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./db.js";

await connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", gameRoutes);
app.use("/api", highscoreRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../client/dist")));

app.use((req, res) => {
    if (req.path.startsWith("/api")) {
        return res.status(404).json({ error: "Not found" });
    }
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(5080, () => {
    console.log("Server running on http://localhost:5080");
});
