import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Header from "../components/Header";

import classes from "./AddGame.module.css";

const AddGameForm = () => {
  const d = new Date();
  let month = d.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  const today = `${d.getFullYear()}-${month}-${d.getDate()}`;
  const [gameData, setGameData] = useState({
    weekNumber: 0,
    lockTime: today,
    homeTeam: { name: "", picks: [] },
    awayTeam: { name: "", picks: [] },
  });
  const [httpError, setHttpError] = useState();
  const navigate = useNavigate();

  const homeTeamChangeHandler = (e) => {
    const clone = { name: e.target.value, picks: [] };
    setGameData({ ...gameData, homeTeam: clone });
  };

  const awayTeamChangeHandler = (e) => {
    const clone = { name: e.target.value, picks: [] };
    setGameData({ ...gameData, awayTeam: clone });
  };

  const weekNumberChangeHandler = (e) => {
    setGameData({ ...gameData, weekNumber: e.target.value });
  };

  const lockTimeChangeHandler = (e) => {
    setGameData({ ...gameData, lockTime: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await axios
      .get(`/user/${localStorage.getItem("user-id")}/`, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("x-auth-token"),
        },
      })
      .catch((err) => {
        setHttpError(err.response.data.msg);
      });
    if (response) {
      if (response.data.data.auth === 1) {
        axios.post(`/game/`, gameData);
      }
      else {
        console.log("Stop it");
      }
    }
    navigate("/game-week");
  };

  if (httpError) {
    return <h3>{httpError}</h3>;
  }

  return (
    <div>
      <Header />
      <h2 className={classes.title}>Add Game</h2>
      <form onSubmit={submitHandler}>
        <label htmlFor="home-team">Home Team</label>
        <input
          type="text"
          id="home-team"
          onChange={homeTeamChangeHandler}
          value={gameData.homeTeam.name}
        />
        <label htmlFor="away-team">Away Team</label>
        <input
          type="text"
          id="away-team"
          onChange={awayTeamChangeHandler}
          value={gameData.awayTeam.name}
        />
        <label htmlFor="week-number">Week Number</label>
        <input
          type="Number"
          id="week-number"
          onChange={weekNumberChangeHandler}
          value={gameData.weekNumber}
        />
        <label htmlFor="lock-time">Lock Time</label>
        <input
          type="date"
          id="lock-time"
          onChange={lockTimeChangeHandler}
          value={gameData.lockTime}
        />
        <Button>Click Me</Button>
      </form>
    </div>
  );
};

export default AddGameForm;
