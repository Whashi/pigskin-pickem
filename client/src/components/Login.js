import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import useInputField from "../hooks/input-field";
import Card from "../ui/Card";
import Button from "../ui/Button";

import classes from "./Login.module.css";

const Login = (props) => {

  // Destructuring the costum hook to use for the email field

  const {
    enteredValue: emailInput,
    valueIsValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
  } = useInputField((value) => value.trim() !== ""); //make this check for valid email

  // Destructuring the costum hook to use for the password field

  const {
    enteredValue: passwordInput,
    valueIsValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    valueBlurHandler: passwordBlurHandler,
  } = useInputField((value) => value.trim() !== "");

  const [httpError, setHttpError] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  let formIsValid = false;

  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const getProfileId = async (email, password) => {
    const response = await axios
      .post(
        "/user/login/",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .catch((err) => {
        setHttpError(err.response.data.msg);
      });
    if (response) {
      localStorage.setItem("x-auth-token", response.data.token);
      localStorage.setItem("user-id", response.data.id);
      localStorage.setItem("privilage", response.data.auth);
      localStorage.setItem("user-name", response.data.user);
      // Make a database with current user ids that are logged on and tokens as their key. Have a function check the database every api call
      navigate(`/game-week/${response.data.id}`);
    }
  };

  const submissionHandler = (e) => {
    e.preventDefault();
    if (!emailIsValid && !passwordIsValid) {
      return;
    }
    getProfileId(emailInput, passwordInput).catch((err) => {
      setHttpError(err);
    });
  };

  const showPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className={classes["login-card"]}>
      <h2 className={classes["login-header"]}>Login</h2>
      <div className={classes["login-container"]}>
        <form
          className={classes["login-item-form"]}
          onSubmit={submissionHandler}
        >
          <label className={classes["login-item"]} htmlFor="email">
            Email
          </label>
          <input
            className={classes["login-item"]}
            type="email"
            id="email"
            onBlur={emailBlurHandler}
            onChange={emailChangeHandler}
            value={emailInput}
          />
          {emailHasError && (
            <p className={classes.error}>Please enter a valid email</p>
          )}
          <label className={classes["login-button"]} htmlFor="password">
            Password
          </label>
          <input
            className={classes["login-item"]}
            type={showPassword ? "text" : "password"}
            id="password"
            onBlur={passwordBlurHandler}
            onChange={passwordChangeHandler}
            value={passwordInput}
          />
          <p onClick={showPasswordToggle}>Show Password</p>
          {passwordHasError && (
            <p className={classes.error}>Please enter a valid password</p>
          )}
          <Button className={classes["login-button"]} disabled={!formIsValid}>
            Login
          </Button>
          {httpError && (
            <p className={classes.error}>
              Either your password sucks or you dont have a profile
            </p>
          )}
        </form>
        <p onClick={props.signUpToggle}>Or sign up</p>
      </div>
    </Card>
  );
};

export default Login;
