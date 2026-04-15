import { useEffect, useState } from "react";

function Highscore() {
  const [scores, setScores] = useState([]);
  const [wordLength, setWordLength] = useState(5);
  const [allowRepeats, setAllowRepeats] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const url = showAll
      ? "http://localhost:5080/api/highscore"
      : `http://localhost:5080/api/highscore?length=${wordLength}&repeat=${allowRepeats}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setScores(data);
      });
  }, [wordLength, allowRepeats, showAll]);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
      <h1>Highscores {showAll ? "(alla spel)" : `(${wordLength} bokstäver)`}</h1>

      <label style={{ marginLeft: "10px" }}>
        <input
          type="checkbox"
          checked={showAll}
          onChange={(e) => setShowAll(e.target.checked)}
        />
        Visa alla highscores
      </label>

      <div style={{ marginBottom: "15px" }}>
        <label>Längd:</label>
        <input
          type="number"
          value={wordLength}
          onChange={(e) => setWordLength(Number(e.target.value))}
          min="3"
          max="8"
        />

        <label style={{ marginLeft: "10px" }}>
          <input
            type="checkbox"
            checked={allowRepeats}
            onChange={(e) => setAllowRepeats(e.target.checked)}
          />
          Tillåt upprepningar
        </label>
      </div>


      {scores.length === 0 && <p>Inga scores ännu</p>}
      <p>
        Antal highscores: {scores.length}
      </p>
      <ul className="highscore-list">
        {scores.map((score, i) => (
          <li key={score._id}
          >
            #{i + 1} — {score.name} - {score.time}s - {score.guesses.length} gissningar - {score.settings?.wordLength || "?"} bokstäver
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Highscore;
