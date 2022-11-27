import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import UserWins from "../components/UserWins";

import classes from "./PlayerList.module.css";

const PlayersList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get("/user/", {
        headers: { "x-auth-token": localStorage.getItem("x-auth-token") },
      });
      if (!response) {
        throw new Error("Something Went Wrong");
      }
      setAllUsers(response.data.data);
    };

    setIsLoading(true);
    getUsers().catch((error) => {
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

  const playersList = allUsers.map((user, index) => {
    return (
      <UserWins
        key={index}
        userName={user.userName}
        userId={user.userId}
        wins={user.wins}
      />
    );
  });

  return (
    <div>
      <Header />
      <h2 className={classes.title}>Players List</h2>
      <ul>{playersList}</ul>

    </div>
  );
};

export default PlayersList;
