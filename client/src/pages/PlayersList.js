import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";

const PlayersList = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
        const getUsers = async () => {
          const response = await axios.get("/game/", {
            headers: { "x-auth-token": localStorage.getItem("x-auth-token") },
          });
          if (!response) {
            throw new Error("Something Went Wrong");
          }
          setAllUsers(response.data.data);
        };
        const getGames = async () => {
            const response = await axios.get("/game/", {
              headers: { "x-auth-token": localStorage.getItem("x-auth-token") },
            });
            if (!response) {
              throw new Error("Something Went Wrong");
            }
            setAllGames(response.data.data);
          };
          const setUserGameData = (userData, gameData) => {
            userData.map((user) =>  {
                
            })
          }
        setIsLoading(true);
        getUsers().catch((error) => {
          setIsLoading(false);
          setHttpError(error.message);
        });
        getGames().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
          });
          setUserGameData()
        setIsLoading(false);
      }, []);
    
      if (isLoading) {
        return <p>Loading...</p>;
      }
    
      if (httpError) {
        return <p>{httpError}</p>;
      }

  return (
    <div>PlayersList</div>
  )
}

export default PlayersList