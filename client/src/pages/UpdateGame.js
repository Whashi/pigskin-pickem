import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../ui/Button";

import classes from "./UpdateGame.module.css";

const UpdateGame = () => {
  const params = useParams();
  const gameId = params.gameId;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();
  const [newGame, setNewGame] = useState({});

  useEffect(() => {
    const getGame = async (id) => {
      const response = await axios.get(`/game/${id}`, {
        headers: { "x-auth-token": localStorage.getItem("x-auth-token") },
      });
      if (!response) {
        throw new Error("Something Went Wrong");
      }
      const d = new Date(response.data.data.lockTime);
      const year = `${d.getFullYear()}`;
      let date = `${d.getDate() + 1}`;
      if (d.getDate() + 1 < 10) {
        date = `0${d.getDate() + 1}`;
      }
      let month = `${d.getMonth() + 1}`;
      if (d.getMonth() + 1 < 10) {
        month = `0${d.getMonth() + 1}`;
      }
      const parsedLockTime = `${year}-${month}-${date}`;
      setNewGame({ ...response.data.data, lockTime: parsedLockTime });
    };
    setIsLoading(true);
    getGame(gameId).catch((error) => {
      if (error.response.data.msg === "Invalid Token") {
        navigate("/");
      }
      setIsLoading(false);
      setHttpError(error.response.data.msg);
      console.log(error);
    });
    setIsLoading(false);
  }, [gameId, navigate]);

  if (isLoading || Object.keys(newGame).length === 0) {
    return <p>Loading...</p>;
  }

  if (httpError) {
    return <p>{httpError}</p>;
  }

  const homeTeamChangeHandler = (e) => {
    const clone = { name: e.target.value, picks: [...newGame.homeTeam.picks], won: newGame.homeTeam.won};
    setNewGame({ ...newGame, homeTeam: clone });
  };

  const awayTeamChangeHandler = (e) => {
    const clone = { name: e.target.value, picks: [...newGame.awayTeam.picks], won: newGame.awayTeam.won };
    setNewGame({ ...newGame, awayTeam: clone });
  };

  const weekNumberChangeHandler = (e) => {
    setNewGame({ ...newGame, weekNumber: e.target.value });
  };

  const lockTimeChangeHandler = (e) => {
    setNewGame({ ...newGame, lockTime: e.target.value });
  };

  const wonChangeHandler = (e) => {
    if (e.target.value === "home-team-won") {
      const homeClone = { name: newGame.homeTeam.name, picks: [...newGame.homeTeam.picks], won: true };
      const awayClone = { name: newGame.awayTeam.name, picks: [...newGame.awayTeam.picks], won: false };
      setNewGame({ ...newGame, homeTeam: homeClone, awayTeam: awayClone });
    } else {
      const awayClone = { name: newGame.awayTeam.name, picks: [...newGame.awayTeam.picks], won: true };
      const homeClone = { name: newGame.homeTeam.name, picks: [...newGame.homeTeam.picks], won: false };
      setNewGame({ ...newGame, homeTeam: homeClone, awayTeam: awayClone });
    }
    
  }

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
        axios.patch(`/game/${gameId}`, newGame, {
          headers: { "x-auth-token": localStorage.getItem("x-auth-token") },
        });
      } else {
        console.log("Stop it");
      }
    }

    navigate("/game-week");
  };

  //make a patch function to update any changed to the db

  return (
    <div>
      <Header />
      <h2 className={classes.title}>Update Game</h2>
      <form onSubmit={submitHandler}>
        <label htmlFor="home-team">Home Team</label>
        <input
          type="text"
          id="home-team"
          onChange={homeTeamChangeHandler}
          value={newGame.homeTeam.name}
        />
        <label htmlFor="away-team">Away Team</label>
        <input
          type="text"
          id="away-team"
          onChange={awayTeamChangeHandler}
          value={newGame.awayTeam.name}
        />
        <label htmlFor="week-number">Week Number</label>
        <input
          type="Number"
          id="week-number"
          onChange={weekNumberChangeHandler}
          value={newGame.weekNumber}
        />
        <label htmlFor="lock-time">Lock Time</label>
        <input
          type="date"
          id="lock-time"
          onChange={lockTimeChangeHandler}
          value={newGame.lockTime}
        />
        <label htmlFor="home-team-won">Home Team Won</label>
        <input type="radio"
          id="home-team-won"
          name="home-team-won"
          value="home-team-won"
          onClick={wonChangeHandler}
          defaultChecked={newGame.homeTeam.won}
        />
        <label htmlFor="away-team-won">Lost</label>
        <input type="radio"
          id="away-team-won"
          name="away-team-won"
          value="away-team-won"
          onClick={wonChangeHandler}
          defaultChecked={newGame.awayTeam.won}
        />
        <Button>Save</Button>
      </form>
    </div>
  );
};

export default UpdateGame;
