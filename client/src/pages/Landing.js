import { useState } from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

const Landing = () => {
  const [signUp, setSignUp] = useState(false);
  const signUpToggle = () => {
    setSignUp(!signUp)
  }
  return (
    <div>
      <h1>Piggy Pick</h1>
      {signUp ? (
        <SignUp signUpToggle={signUpToggle} />
      ) : (
        <Login signUpToggle={signUpToggle} />
      )}
    </div>
  );
};

export default Landing;
