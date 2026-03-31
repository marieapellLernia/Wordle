import { useEffect, useState } from "react";

function Highscore() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5080/api/highscores")
      .then((res) => res.json())
      .then((data) => {
        setScores(data);
      });
  }, []);

  return (
    <div>
      <h1>Highscores</h1>

      {scores.length === 0 && <p>Inga scores ännu</p>}

      <ul>
        {scores.map((score, i) => (
          <li key={i}>
            {score.name} - {score.time}s - {score.guesses} guesses
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Highscore;
