function About() {
  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
      <h1>Om projektet</h1>

      <p>
        Detta är ett Wordle-inspirerat spel byggt som en fullstack-applikation.
        Spelet låter användaren gissa ett slumpat ord och får feedback på varje
        bokstav enligt färgerna grönt (rätt plats), gult (fel plats) och rött (fel bokstav).
      </p>

      <h2>Tekniker</h2>
      <ul>
        <li>React (frontend)</li>
        <li>Node.js + Express (backend)</li>
        <li>MongoDB (highscore-databas)</li>
        <li>REST API</li>
      </ul>

      <h2>Funktioner</h2>
      <ul>
        <li>Slumpmässiga ord genereras på servern</li>
        <li>Spelaren kan gissa ord och få feedback</li>
        <li>Timer som mäter speltid</li>
        <li>Highscore sparas i databas</li>
      </ul>

      <h2>Syfte</h2>
      <p>
        Projektet är gjort för att öva fullstack-utveckling, API-design och
        hantering av state mellan frontend och backend.
      </p>
      <p style={{ marginTop: "30px", fontStyle: "italic" }}>
        Skapat av: Marie — 2026
      </p>

    </div>
  );
}

export default About;
