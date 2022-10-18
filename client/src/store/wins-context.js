import { createContext, useReducer } from "react";
import winsReducer from "./wins-reducer";

const initialState = {
  wins: [],
};

export const WinsContext = createContext(initialState);

export const WinsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(winsReducer, initialState);

  function setWins(win) {
    dispatch({ type: "SET_WINS_DATA", payload: win });
  }

  return (
    <WinsContext.Provider value={{ wins: state.wins, setWins }}>
      {children}
    </WinsContext.Provider>
  );
};
