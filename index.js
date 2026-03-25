export default function compareWords(guess, correctWord) {
    const result = [];
    const guessedWord = guess.split("");
    const correct = correctWord.split("");

    const used = Array(correct.length).fill(false);

    for (let i = 0; i < guessedWord.length; i++) {
        if (guessedWord[i] === correct[i]) {
            result[i] = {
                letter: guessedWord[i],
                result: "correct",
            };
            used[i] = true;
        }
    }

    for (let i = 0; i < guessedWord.length; i++) {
        if (result[i]) continue;

        let found = false;

        for (let j = 0; j < correct.length; j++) {
            if (!used[j] && guessedWord[i] === correct[j]) {
                found = true;
                used[j] = true;
                break;
            }
        }

        result[i] = {
            letter: guessedWord[i],
            result: found ? "misplaced" : "incorrect",
        };
    }

    return result;
}
