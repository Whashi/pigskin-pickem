import classes from "./Button.module.css";

const Button = (props) => {
  const buttonClass = `${classes["my-button"]} ` + props.className;
  return (
    <button className={buttonClass} onClick={props.onClick} value={props.value}>
      {props.children}
    </button>
  );
};

export default Button;
