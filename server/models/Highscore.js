import mongoose from "mongoose";

const highscoreSchema = new mongoose.Schema({
  name: String,
  time: Number,
  guesses: Array,
  settings: {
    wordLength: Number,
    allowRepeats: Boolean
  }
});

export default mongoose.model("Highscore", highscoreSchema);
