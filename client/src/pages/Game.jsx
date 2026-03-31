import { useEffect, useState } from "react";

function Game() {
    const [word, setWord] = useState("");
    const [guess, setGuess] = useState("");
    const [history, setHistory] = useState([]);
    const [isGameOver, setIsGameOver] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);



    useEffect(() => {
        fetch("http://localhost:5080/api/word")
            .then((res) => res.json())
            .then((data) => {
                setWord(data.word);
                setStartTime(Date.now());
            });
    }, []);

    const handleGuess = async () => {
        if (isGameOver) return;

        const res = await fetch("http://localhost:5080/api/guess", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                guess,
                correctWord: word,
            }),
        });

        const data = await res.json();

        const isWin = data.every(letter => letter.result === "correct");

        if (isWin) {
            setIsGameOver(true);
            setEndTime(Date.now());
        }


        setHistory([...history, data]);
        setGuess("");
    };

    const startNewGame = async () => {
        const res = await fetch("http://localhost:5080/api/word");
        const data = await res.json();

        setWord(data.word);
        setHistory([]);
        setGuess("");
        setIsGameOver(false);
        setStartTime(Date.now());
        setEndTime(null);

    };

    return (
        <div>
            <h1>Wordle</h1>
            {isGameOver && (
                <>
                    <h2>GRATTIS, du gissade rätt!</h2>
                    <p>Tid: {Math.floor((endTime - startTime) / 1000)} sekunder</p>
                    <button onClick={startNewGame}>
                        New Game
                    </button>
                </>
            )}



            <input
                disabled={isGameOver}
                value={guess}
                onChange={(e) => setGuess(e.target.value.toUpperCase())}
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
                                    width: "40px",
                                    height: "40px",
                                    lineHeight: "40px",
                                    borderRadius: "15px",
                                    margin: "5px",
                                    textAlign: "center",
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
