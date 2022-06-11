import { createContext, useReducer } from "react";
import gameReducer from "./game-reducer";

const initialState = {
  games: [],
};

export const GameContext = createContext(initialState);

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  function setAllGames(games) {
    dispatch({ type: "SET_ALL_GAMES", payload: games });
  }

  function chooseTeam(gameId, teamChoice, userId) {
    dispatch({
      type: "CHOOSE_TEAM",
      payload: {
        gameId,
        teamChoice,
        userId,
      },
    });
  }

  return (
    <GameContext.Provider
      value={{ games: state.games, setAllGames, chooseTeam }}
    >
      {children}
    </GameContext.Provider>
  );
};
