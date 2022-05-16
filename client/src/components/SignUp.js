import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import useInputField from "../hooks/input-field";
import Card from "../ui/Card";
import Button from "../ui/Button";

import classes from "./SignUp.module.css";

const SignUp = (props) => {
  // Destructuring the costume hook to use for the username field

  const {
    enteredValue: userNameInput,
    valueIsValid: userNameIsValid,
    hasError: userNameHasError,
    valueChangeHandler: userNameChangeHandler,
    valueBlurHandler: userNameBlurHandler,
  } = useInputField((value) => value.trim() !== "");

  // Destructuring the costume hook to use for the email field

  const {
    enteredValue: emailInput,
    valueIsValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
  } = useInputField((value) => value.trim() !== ""); //make this check for valid email

  // Destructuring the costume hook to use for the password field

  const {
    enteredValue: passwordInput,
    valueIsValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    valueBlurHandler: passwordBlurHandler,
  } = useInputField((value) => value.trim() !== "");

  // Destructuring the costume hook to use for the re-enter password field

  const {
    enteredValue: reenterPasswordInput,
    valueIsValid: reenterPasswordIsValid,
    hasError: reenterPasswordHasError,
    valueChangeHandler: reenterPasswordChangeHandler,
    valueBlurHandler: reenterPasswordBlurHandler,
  } = useInputField((value) => value.trim() !== "");

  const [httpError, setHttpError] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showReenterPassword, setShowReenterPassword] = useState(false);

  const navigate = useNavigate();

  let formIsValid = false;

  if (
    userNameIsValid &&
    emailIsValid &&
    passwordIsValid &&
    reenterPasswordIsValid
  ) {
    formIsValid = true;
  }

  const signUpAndLogIn = async (userName, email, password) => {
    const signUp = await axios
      .post(
        "http://localhost:5000/user/",
        {
          userName,
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
    if (signUp) {
      const response = await axios.post(
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
      );
      if (response) {
        localStorage.setItem("x-auth-token", response.data.token);
        localStorage.setItem("user-id", response.data.id);
        // Make a database with current user ids that are logged on and tokens as their key. Have a function check the database every api call
        navigate("/game-week/");
      }
    }
  };

  const submissionHandler = (e) => {
    e.preventDefault();
    if (
      !userNameIsValid &&
      !emailIsValid &&
      !passwordIsValid &&
      !reenterPasswordIsValid
    ) {
      return;
    }
    signUpAndLogIn(userNameInput, emailInput, passwordInput).catch((err) => {
      setHttpError(err);
    });
  };

  const showPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const showReenterPasswordToggle = () => {
    setShowReenterPassword(!showReenterPassword);
  };

  return (
    <Card className={classes["login-card"]}>
      <h2 className={classes["login-header"]}>SignUp</h2>
      <div className={classes["login-container"]}>
        <form
          className={classes["login-item-form"]}
          onSubmit={submissionHandler}
        >
          <label className={classes["login-item"]} htmlFor="username">
            Username
          </label>
          <input
            className={classes["login-item"]}
            type="text"
            id="username"
            onBlur={userNameBlurHandler}
            onChange={userNameChangeHandler}
            value={userNameInput}
          />
          {userNameHasError && (
            <p className="error">Please enter a valid username</p>
          )}

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
          {emailHasError && <p className="error">Please enter a valid email</p>}

          <label className="login-item" htmlFor="password">
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

          <label className="login-item" htmlFor="reenter-password">
            Re-enter Password
          </label>
          <input
            className={classes["login-item"]}
            type={showReenterPassword ? "text" : "password"}
            id="reenter-password"
            onBlur={reenterPasswordBlurHandler}
            onChange={reenterPasswordChangeHandler}
            value={reenterPasswordInput}
          />
          <p onClick={showReenterPasswordToggle}>Show Re-entered Password</p>
          {reenterPasswordHasError && (
            <p className={classes.error}>Please enter a valid password</p>
          )}
          <Button className={classes["login-button"]} disabled={!formIsValid}>
            Sign Up
          </Button>
          {httpError && <p className={classes.error}>{httpError}</p>}
        </form>
        <p onClick={props.signUpToggle}>Or login</p>
      </div>
    </Card>
  );
};

export default SignUp;
