import express from "express";
import compareWords from "../utils/compareWords.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const words = fs
  .readFileSync(path.join(__dirname, "../data/words.txt"), "utf-8")
  .split("\n")
  .map(w => w.trim().toUpperCase());

let currentWord = "";
let startTime = null;

router.get("/word", (req, res) => {
  const length = Number(req.query.length) || 5;
  const allowRepeats = req.query.repeat === "true";

  let filtered = words.filter(w => w.length === length);

  if (!allowRepeats) {
    filtered = filtered.filter(word => {
      const letters = word.split("");
      return new Set(letters).size === letters.length;
    });
  }

  const randomWord = filtered[Math.floor(Math.random() * filtered.length)];

  currentWord = randomWord;
  startTime = Date.now();

  res.json({ success: true });
});

router.post("/guess", (req, res) => {
  const { guess } = req.body;

  if (!currentWord) {
    return res.status(400).json({ error: "No game started" });
  }

  const result = compareWords(guess, currentWord);

  const isWin = result.every(l => l.result === "correct");

  let time = null;

  if (isWin) {
    time = Math.floor((Date.now() - startTime) / 1000);
  }

  res.json({
     result,
    isWin,
    time
  });
});

export default router;
