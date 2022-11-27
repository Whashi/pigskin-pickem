import Card from "../ui/Card";
import { useNavigate } from "react-router-dom";

const UserWins = (props) => {
  const navigate = useNavigate();
  const winsInfo = `${props.userName}: ${props.wins.length}`;

  const showUser = () => {
    navigate(`/game-week/${props.userId}`);
  };
  return (
    <Card onClick={showUser}>
      <li>{winsInfo}</li>
    </Card>
  );
};

export default UserWins;
