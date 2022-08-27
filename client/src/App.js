import { Route, Routes } from "react-router-dom";
import AddGame from "./pages/AddGame";
import GameWeek from "./pages/GameWeek";
import Landing from "./pages/Landing";
import UpdateGame from "./pages/UpdateGame";
import { GameProvider } from "./store/game-context";
import { UserProvider } from "./store/user-context";

function App() {
  return (
    <UserProvider>
      <GameProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/game-week" element={<GameWeek />} />
          <Route path="/add-game" element={<AddGame />} />
          <Route path="/update-game/:gameId" element={<UpdateGame />} />
        </Routes>
      </GameProvider>
    </UserProvider>
  );
}

export default App;
