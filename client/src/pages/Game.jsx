import { useEffect, useState } from "react";

function Game() {
    const [guess, setGuess] = useState("");
    const [history, setHistory] = useState([]);
    const [isGameOver, setIsGameOver] = useState(false);
    const [time, setTime] = useState(null);
    const [playerName, setPlayerName] = useState("");
    const [wordLength, setWordLength] = useState(5);
    const [allowRepeats, setAllowRepeats] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");


    useEffect(() => {
        startNewGame();
    }, [wordLength, allowRepeats]);

    const [error, setError] = useState("");

    const handleGuess = async () => {
        if (isGameOver) return;

        if (!guess) {
            setError("Skriv ett ord först!");
            return;
        }

        if (guess.length !== wordLength) {
            setError(`Ordet måste vara ${wordLength} bokstäver`);
            return;
        }

        setError("");

        const res = await fetch("http://localhost:5080/api/guess", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                guess
            }),
        });

        const data = await res.json();

        setHistory(prev => [...prev, data.result]);

        if (!res.ok) {
            console.error(data.error);
            return;
        }

        if (data.isWin) {
            setIsGameOver(true);
            setTime(data.time);
        }

        setGuess("");
    };

    const saveScore = async () => {
        if (!playerName) {
            alert("Skrv ditt namn!");
            return;
        }

        await fetch("http://localhost:5080/api/highscore", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: playerName,
                time,
                guesses: history,
            }),
        });

        setSuccessMessage("Highscore sparad! 🎉");
    };


    const startNewGame = async () => {
        await fetch(`http://localhost:5080/api/word?length=${wordLength}&repeat=${allowRepeats}`);

        setHistory([]);
        setGuess("");
        setIsGameOver(false);
        setTime(null);

    };

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
            <h1>Wordle</h1>

            {successMessage && (
                <p style={{
                    background: "#44AF69",
                    color: "white",
                    padding: "10px",
                    borderRadius: "8px",
                    margin: "10px 0"
                }}>
                    {successMessage}
                </p>
            )}

            {error && (
                <p style={{
                    background: "#D91E36",
                    color: "white",
                    padding: "10px",
                    borderRadius: "8px",
                    margin: "10px 0"
                }}>
                    {error}
                </p>
            )}

            {isGameOver && (
                <>
                    <h2>GRATTIS, du gissade rätt!</h2>
                    <p>Tid: {time} sekunder</p>

                    <input
                        placeholder="Ditt namn"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                    />

                    <button onClick={saveScore}>Spara score</button>
                    <button onClick={startNewGame}>Nytt spel</button>
                </>
            )}

            <div>
                <label>Längd:</label>
                <input
                    type="number"
                    value={wordLength}
                    onChange={(e) => setWordLength(Number(e.target.value))}
                    min="3"
                    max="8"
                />

                <label>
                    <input
                        type="checkbox"
                        checked={allowRepeats}
                        onChange={(e) => setAllowRepeats(e.target.checked)}
                    />

                </label>
            </div>

            <input
                disabled={isGameOver}
                value={guess}
                onChange={(e) => {
                    setGuess(e.target.value.toUpperCase())
                    setError("");
                }}
                placeholder="Gissa ordet"
            />

            <button onClick={handleGuess} disabled={isGameOver}>Gissa</button>

            <div>
                {history.map((row, i) => (
                    <div key={i}>
                        {row.map((letterObj, j) => (
                            <span key={j}
                                style={{
                                    display: "inline-block",
                                    width: "50px",
                                    height: "50px",
                                    lineHeight: "50px",
                                    borderRadius: "15px",
                                    margin: "5px",
                                    textAlign: "center",
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    fontFamily: "Arial, sans-serif",
                                    color: "white",
                                    backgroundColor:
                                        letterObj.result === "correct"
                                            ? "#44AF69"
                                            : letterObj.result === "misplaced"
                                                ? "#FCAB10"
                                                : "#D91E36",
                                }}>
                                {letterObj.letter}
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}




export default Game;
