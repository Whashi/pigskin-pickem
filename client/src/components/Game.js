import { useContext } from "react";
import { GameContext } from "../store/game-context";

import classes from "./Game.module.css";

const Game = (props) => {
  const index = props.index;

  const { chooseTeam } = useContext(GameContext);

  const pickHandler = (e) => {
    chooseTeam(props.gameId, e.target.value, localStorage.getItem("user-id"));
  };

  return (
    <div className={classes["game-block"]}>
      <div className={classes["team-picker"]}>
        <input
          type="radio"
          id={index}
          name={index}
          value="home-team"
          onClick={pickHandler}
          className={classes.radio}
        />
        <h3>{props.homeTeam}</h3>
      </div>
      <h4>vs</h4>
      <div className={classes["team-picker"]}>
        <h3>{props.awayTeam}</h3>
        <input
          type="radio"
          id={index}
          name={index}
          value="away-team"
          onClick={pickHandler}
          className={classes.radio}
        />
      </div>
    </div>
  );
};

export default Game;
