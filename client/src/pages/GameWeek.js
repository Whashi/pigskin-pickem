import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AddGameForm from "../components/AddGameForm";
import Game from "../components/Game";
import Header from "../components/Header";
import { GameContext } from "../store/game-context";
import Button from "../ui/Button";

import classes from "./GameWeek.module.css";

const GameWeek = () => {
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();

  const editModeToggle = () => {
    setEditMode(!editMode);
  };
  const [showAddGameForm, setshowAddGameForm] = useState(false);
  const showAddGameFormToggle = () => {
    setshowAddGameForm(!showAddGameForm);
  };

  const { games, setAllGames } = useContext(GameContext);

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

  const gameList = games.map((game, index) => {
    return (
      <Game
        key={game._id}
        gameId={game._id}
        index={index}
        homeTeam={game.homeTeam.name}
        awayTeam={game.awayTeam.name}
      />
    );
  });

  return (
    <div>
      <Header />
      <h2 className={classes.title}>Game Week</h2>
      <ul className={classes["game-list"]}>{gameList}</ul>
      <Button className={classes["edit-game-button"]} onClick={editModeToggle}>
        Edit Game List
      </Button>
      {editMode ? (
        <Button onClick={showAddGameFormToggle}>Add Game</Button>
      ) : null}
      {showAddGameForm ? <AddGameForm /> : null}
    </div>
  );
};

export default GameWeek;
