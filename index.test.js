import compareWords from "./index.js";

/*
1.Exakta träffar
2. Inga träffar
3. Felplacerade bokstäver
4. Dubbla bokstäver
*/


test("returns all correct when guess matches word", () => {
    const result = compareWords("CYKLA", "CYKLA");

    expect(result).toEqual([
        { letter: "C", result: "correct" },
        { letter: "Y", result: "correct" },
        { letter: "K", result: "correct" },
        { letter: "L", result: "correct" },
        { letter: "A", result: "correct" },
    ]);
});

test("returns all incorrect when no letters match", () => {
    const result = compareWords("BBBBB", "CYKLA");

    expect(result).toEqual([
        { letter: "B", result: "incorrect" },
        { letter: "B", result: "incorrect" },
        { letter: "B", result: "incorrect" },
        { letter: "B", result: "incorrect" },
        { letter: "B", result: "incorrect" },
    ]);
});

test("handles correct, misplaced and incorrect letters", () => {
    const result = compareWords("ALKYC", "CYKLA");

    expect(result).toEqual([
        { letter: "A", result: "misplaced" },
        { letter: "L", result: "misplaced" },
        { letter: "K", result: "correct" },
        { letter: "Y", result: "misplaced" },
        { letter: "C", result: "misplaced" },
    ]);
});



test("handles duplicate letters correctly", () => {
    const result = compareWords("HALLÅ", "CYKLA");

    expect(result).toEqual([
        { letter: "H", result: "incorrect" },
        { letter: "A", result: "misplaced" },
        { letter: "L", result: "incorrect" },
        { letter: "L", result: "correct" },
        { letter: "Å", result: "incorrect" },
    ]);
});