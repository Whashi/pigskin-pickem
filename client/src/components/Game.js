import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

import classes from "./Game.module.css";

const Game = (props) => {
  const index = props.index;
  const navigate = useNavigate();

  const pickHandler = async (e) => {
    const { gameId } = props;
    const team = e.target.value;
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
      .catch((err) => console.log(err.response.data.msg));
  };

  const editButtonClickHandler = () => {
    navigate(`/update-game/${props.gameId}`)
  }

  return (
    <div
      className={
        props.weekNumber.toString() === props.weekSelector
          ? classes["game-block"]
          : classes["no-show"]
      }
    >
      <div className={classes["team-picker"]}>
        <input
          type="radio"
          id={index}
          name={index}
          value="home-team"
          onClick={pickHandler}
          className={classes.radio}
          defaultChecked={props.homeTeam.picks.includes(
            localStorage.getItem("user-id")
          )}
        />
        <h3>{props.homeTeam.name}</h3>
      </div>
      <h4>vs</h4>
      <div className={classes["team-picker"]}>
        <h3>{props.awayTeam.name}</h3>
        <input
          type="radio"
          id={index}
          name={index}
          value="away-team"
          onClick={pickHandler}
          className={classes.radio}
          defaultChecked={props.awayTeam.picks.includes(
            localStorage.getItem("user-id")
          )}
        />
      </div>
      <Button onClick={editButtonClickHandler}>Edit</Button>
    </div>
  );
};

export default Game;
