import express from "express";
import Highscore from "../models/Highscore.js";

const router = express.Router();

router.get("/highscore", async (req, res) => {
    try {
  const scores = await Highscore.find().sort({ time: 1, guesses: 1 });
  res.json(scores);
   } catch (err) {
    res.status(500).json([]);
   }
});

router.post("/highscore", async (req, res) => {
  console.log("Saving score:", req.body);

  const score = new Highscore(req.body);
  await score.save();

  res.json({ success: true, message: "Score saved!" });
});

export default router;
