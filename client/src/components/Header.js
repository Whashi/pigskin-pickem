import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import MenuIcon from "@mui/icons-material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";

import classes from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();
  const [userAuthLevel, setUserAuthLevel] = useState();
  const [httpError, setHttpError] = useState();
  // const authorized = profileAuthLevel === 2;
  const userRoute = "/user/" + localStorage.getItem("user-id");
  const [hamburgerToggle, setHamburgerToggle] = useState(false);

  useEffect(() => {
    const getUserAuthLevel = async (id) => {
      const response = await axios
        .get(`/user/${id}`, {
          headers: { "x-auth-token": localStorage.getItem("x-auth-token") },
        })
        .catch((err) => console.log(err.response.data.msg));
      if (!response) {
        navigate("/");
      }
      setUserAuthLevel(response.data.data.authorization);
    };
    getUserAuthLevel(localStorage.getItem("user-id")).catch((error) => {
      setHttpError(error);
    });
  }, [navigate, userAuthLevel]);

  const logOut = () => {
    localStorage.removeItem("x-auth-token");
    localStorage.removeItem("user-id");
    navigate("/");
  };

  if (httpError) {
    return <h3>{httpError}</h3>;
  }

  const hamburgerClickHandler = () => {
    setHamburgerToggle(!hamburgerToggle);
  };

  const titleClickHandler = () => {
    navigate("/game-week")
  }

  return (
    <Fragment>
      <header>
        <div className={classes["header-container"]}>
          <div className={classes["title-container"]}>
            <h4 className={classes["header-title"]} onClick={titleClickHandler}>Piggy Pick</h4>
          </div>
          <div className={classes["hamburger-toggle-container"]}>
            <div
              className={classes["hamburger-toggle"]}
              onClick={hamburgerClickHandler}
            >
              {hamburgerToggle ? <CancelIcon /> : <MenuIcon />}
            </div>
          </div>
        </div>
      </header>
      {hamburgerToggle && (
        <Navigation
          userRoute={userRoute}
          // authorized={authorized}
          logOut={logOut}
        />
      )}
    </Fragment>
  );
};

export default Header;
