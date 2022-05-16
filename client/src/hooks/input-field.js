import { useState } from "react";

const useInputField = (validate) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [wasTouched, setWasTouched] = useState(false);

  const valueIsValid = validate(enteredValue);
  const hasError = !valueIsValid && wasTouched;

  const valueChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };

  const valueBlurHandler = () => {
    setWasTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setWasTouched(false);
  };

  return {
    enteredValue,
    valueIsValid,
    hasError,
    wasTouched,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  };
};

export default useInputField;
