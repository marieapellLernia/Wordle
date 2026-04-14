import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Game from "./pages/Game";
import Highscore from "./pages/Highscore";
import About from "./pages/About";


function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Game</Link> |{" "}
        <Link to="/highscore">Highscores</Link> |{" "}
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/highscore" element={<Highscore />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
