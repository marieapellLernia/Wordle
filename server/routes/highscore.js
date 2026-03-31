import express from "express";

const router = express.Router();

const highscores = [];

router.post("/highscore", (req, res) => {
  const { name, time, guesses } = req.body;

  const newScore = {
    name,
    time,
    guesses,
    date: new Date(),
  };

  highscores.push(newScore);

  res.json({ message: "Saved!" });
});

router.get("/highscores", (req, res) => {
  res.json(highscores);
});

export default router;
