const WeeklyWins = (props) => {
    let numberOfWins = 0
     props.wins.map((win) => {
        if (win === parseInt(props.weekNumber)) {
            numberOfWins += 1
        }
    })
  return <div>WeeklyWins {numberOfWins}</div>;
};

export default WeeklyWins;
