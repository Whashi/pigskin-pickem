const Games = require("../models/gameModal");
const User = require("../models/userModel");

exports.setWins = async () => {
  try {
    const userData = await User.find();
    const gameData = await Games.find();
    if (userData && gameData) {
      userData.forEach((user) => {
        gameData.forEach((game) => {
          if (
            (game.homeTeam.won === true &&
              game.homeTeam.picks.includes(user.id)) ||
            (game.awayTeam.won === true &&
              game.awayTeam.picks.includes(user.id))
          ) {
            let found = false;
            user.wins.forEach((win) => {
              if (game.id in win) {
                found = true;
              }
            });
            if (!found) {
              const newWin = { [game.id]: game.weekNumber };
              const newWins = [...user.wins, newWin];
              const newUser = { ...user._doc, wins: newWins };
              updateUser(user.id, newUser)
            }
          }
        });
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (id, user) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, {
      new: true,
    });
  } catch (err) {
    console.log(err);
  }
};
