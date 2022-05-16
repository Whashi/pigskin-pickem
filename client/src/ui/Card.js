import classes from "./Card.module.css";

const Card = (props) => {
  const cardClass = `${classes.card} ` + props.className;
  return (
    <div className={cardClass} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

export default Card;
