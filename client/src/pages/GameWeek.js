import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Game from "../components/Game";
import Header from "../components/Header";
import { GameContext } from "../store/game-context";

import classes from "./GameWeek.module.css";

const GameWeek = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();
  const [weekSelector, setWeekSelector] = useState("1");

  const { games, setAllGames } = useContext(GameContext);
  const user = localStorage.getItem("user-name");

  useEffect(() => {
    const getGames = async () => {
      const response = await axios.get("/game/", {
        headers: { "x-auth-token": localStorage.getItem("x-auth-token") },
      });
      if (!response) {
        throw new Error("Something Went Wrong");
      }
      setAllGames(response.data.data);
    };
    setIsLoading(true);
    getGames().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (httpError) {
    return <p>{httpError}</p>;
  }

  const gameWeekChangeHandler = (e) => {
    setWeekSelector(e.target.value);
  };

  const gameList = games.map((game, index) => {
    return (
      <Game
        key={game._id}
        gameId={game._id}
        index={index}
        homeTeam={game.homeTeam}
        awayTeam={game.awayTeam}
        weekNumber={game.weekNumber}
        weekSelector={weekSelector}
      />
    );
  });

  return (
    <div>
      <Header />
      <h2 className={classes.title}>Hello {user}</h2>
      <label htmlFor="week-number">Week</label>
      <input
        type="number"
        id="week-number"
        max="17"
        min="1"
        onChange={gameWeekChangeHandler}
        value={weekSelector}
      />
      <ul className={classes["game-list"]}>{gameList}</ul>
    </div>
  );
};

export default GameWeek;
