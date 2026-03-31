import { useEffect, useState } from "react";

function Game() {
    const [word, setWord] = useState("");
    const [guess, setGuess] = useState("");
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5080/api/word")
            .then((res) => res.json())
            .then((data) => {
                setWord(data.word);
            });
    }, []);

    const handleGuess = async () => {
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

        setHistory([...history, data]);
        setGuess("");
    };

    return (
        <div>
            <h1>Wordle</h1>

            <input
                value={guess}
                onChange={(e) => setGuess(e.target.value.toUpperCase())}
                placeholder="Enter guess"
            />

            <button onClick={handleGuess}>Guess</button>

            <div>
                {history.map((row, i) => (
                    <div key={i}>
                        {row.map((letterObj, j) => (
                            <span key={j} style={{ margin: "5px" }}>
                                {letterObj.letter} ({letterObj.result})
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Game;
