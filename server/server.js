import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// API: hämta ord
app.get("/api/word", (req, res) => {
  res.json({
    word: "CYKLA"
  });
});

app.listen(5080, () => {
  console.log("Server running on http://localhost:5080");
});
