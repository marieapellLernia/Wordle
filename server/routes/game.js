import express from "express";
import compareWords from "../utils/compareWords.js";

const router = express.Router();

router.post("/guess", (req, res) => {
    const { guess, correctWord } = req.body;

    const result = compareWords(guess, correctWord);

    res.json(result);
});

export default router;
