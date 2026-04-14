import { useEffect, useState } from "react";

function Highscore() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5080/api/highscore")
      .then((res) => res.json())
      .then((data) => {
        setScores(data);
      });
  }, []);

  return (
    <div  style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
      <h1>Highscores</h1>

      {scores.length === 0 && <p>Inga scores ännu</p>}

      <ul>
        {scores.map((score) => (
          <li key={score._id}>
            {score.name} - {score.time}s - {score.guesses.length} guesses
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Highscore;
