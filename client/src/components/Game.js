import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

import classes from "./Game.module.css";

const Game = (props) => {
  const index = props.index;
  const navigate = useNavigate();
  const privilaged = localStorage.getItem("privilage") === "1";
  const [httpError, setHttpError] = useState("");

  const pickHandler = async (team) => {
    const { gameId } = props;
    const userId = localStorage.getItem("user-id");

    //update games to database
    await axios
      .patch(
        "/game",
        { gameId, team, userId },
        {
          headers: { "x-auth-token": localStorage.getItem("x-auth-token") },
        }
      )
      .catch((err) => {
        setHttpError(err.response.data.msg);
      });
  };

  const editButtonClickHandler = () => {
    navigate(`/update-game/${props.gameId}`);
  };

  const wonClass = `${classes["team-picker"]} ${classes["won"]}`;
  const lostClass = `${classes["team-picker"]} ${classes["lost"]}`;

  return (
    <div
      className={
        props.weekNumber.toString() === props.weekSelector
          ? classes["game-block"]
          : classes["no-show"]
      }
    >
      <div className={props.homeTeam.won ? wonClass : lostClass}>
        <div
          className={
            props.homeTeam.picks.includes(localStorage.getItem("user-id"))
              ? classes["no-show"]
              : classes["check-mark"]
          }
        >
          X
        </div>
        <h3
          id={index}
          name={index}
          onClick={pickHandler.bind(this, "home-team")}
        >
          {props.homeTeam.name}
        </h3>
      </div>
      <h4>vs</h4>
      <div className={props.awayTeam.won ? wonClass : lostClass}>
        <h3
          id={index}
          name={index}
          onClick={pickHandler.bind(this, "away-team")}
        >
          {props.awayTeam.name}
        </h3>
        <div
          className={
            props.awayTeam.picks.includes(localStorage.getItem("user-id"))
              ? classes["no-show"]
              : classes["check-mark"]
          }
        >
          X
        </div>
      </div>
      {privilaged && <Button onClick={editButtonClickHandler}>Edit</Button>}
      <h5>
        {httpError === "Too Late Son"
          ? "Lock time for this game has passed"
          : null}
      </h5>
    </div>
  );
};

export default Game;
