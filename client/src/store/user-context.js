import { createContext, useReducer } from "react";
import userReducer from "./user-reducer";

const initialState = {
  user: "",
};

export const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  function setUser(user) {
    dispatch({ type: "SET_USER_DATA", payload: user });
  }

  return (
    <UserContext.Provider value={{ user: state.user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
