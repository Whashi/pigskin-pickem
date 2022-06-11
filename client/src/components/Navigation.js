import React from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

import classes from "./Navigation.module.css";

const Navigation = (props) => {
  const buttonClass = `${classes["logout-button"]} ${classes["nav-item"]}`

  return (
    <nav>
      <ul className={classes["nav-list"]}>
      <li className={classes["nav-item"]}>
          <Link className={classes.link} to="/game-week">
            Game Week
          </Link>
        </li>
        <li className={classes["nav-item"]}>
          <Link className={classes.link} to="/add-game">
            Add Game
          </Link>
        </li>
        {/* <li className={classes["nav-item"]}>
          <Link className={classes.link} to="/change-password">
            Change Password
          </Link>
        </li> */}
        <li>
          <Button
            className={buttonClass}
            onClick={props.logOut}
          >
            Logout
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
