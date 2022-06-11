import Header from "../components/Header";
import { useParams } from "react-router-dom";

import classes from "./UpdateGame.module.css";

const UpdateGame = () => {
  const params = useParams();
  const gameId = params.gameId;

  //fetch game data using game id

  //make a patch function to update any changed to the db

  return (
    <div>
      <Header />
      <h2 className={classes.title}>Update Game</h2>
      {/* make a form loaded with the game data */}
    </div>
  );
};

export default UpdateGame;
