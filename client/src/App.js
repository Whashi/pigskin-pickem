import { Route, Routes } from "react-router-dom";
import GameWeek from "./pages/GameWeek";
import Landing from "./pages/Landing";
import { GameProvider } from "./store/game-context";

function App() {
  return (
    <GameProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/game-week" element={<GameWeek />} />
      </Routes>
    </GameProvider>
  );
}

export default App;
