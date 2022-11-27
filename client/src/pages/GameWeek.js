import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Game from "../components/Game";
import Header from "../components/Header";
import { GameContext } from "../store/game-context";

import classes from "./GameWeek.module.css";
import WeeklyWins from "../components/WeeklyWins";

// use quiery params to load a certain user profile and check if its the user that is logged in
// if not lock out the game picking option and have the greeting say lets look at:

// have a failsafe on the back end to prevent anyone from changing their user id in the local storage and changing some elses profile

const GameWeek = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();
  const [weekSelector, setWeekSelector] = useState("1");
  const [totalWins, setTotalWins] = useState(0)

  const params = useParams();
  const profileId = params.profileId;

  const { games, setAllGames } = useContext(GameContext);
  const [userInfo, setUserInfo] = useState({});

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
    const getUser = async (id) => {
      const response = await axios.get(`/user/get-user/${id}`, {
        headers: { "x-auth-token": localStorage.getItem("x-auth-token") },
      });
      if (!response) {
        throw new Error("Something Went Wrong");
      }
      setUserInfo(response.data.data);
      setTotalWins(response.data.data.wins)
    };
    setIsLoading(true);
    getGames().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
    getUser(profileId).catch((error) => {
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

  const viewingOwnProfile = userInfo.id === localStorage.getItem("user-id");

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
        viewingOwnProfile={viewingOwnProfile}
      />
    );
  });
 
  return (
    <div>
      <Header />
      <h2 className={classes.title}>Oh hey there {userInfo.userName}</h2>
      <h3>Annual Wins: {totalWins.length}</h3>  
      <label htmlFor="week-number">Week</label>
      <input
        type="number"
        id="week-number"
        max="17"
        min="1"
        onChange={gameWeekChangeHandler}
        value={weekSelector}
      />
      {/* <WeeklyWins weekNumber={weekSelector} wins={userInfo.wins}/> */}
      <ul className={classes["game-list"]}>{gameList}</ul>
    </div>
  );
};

export default GameWeek;
