import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://marielernia:ShibaEnzo.4@wordle-game.zzpame0.mongodb.net/wordle");
    console.log("MongoDB connected");
  } catch (err) {
    console.error("DB error:", err);
  }
};
