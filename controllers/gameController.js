const mongoose = require("mongoose");
const Game = require("../models/gameModal");

exports.addGame = async (req, res) => {
  try {
    const newGame = await Game.create(req.body);

    return res.status(200).json({
      success: true,
      data: newGame,
    });
  } catch (err) {
    if (err.name === "Validation Error") {
      const messages = Object.values(err.errors).map((val) => val.messages);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      res.status(500).json({
        success: false,
        error: err,
      });
    }
  }
};

exports.getGames = async (req, res) => {
  try {
    const games = await Game.find();
    return res.status(200).json({
      success: true,
      data: games,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};

exports.updateGame = async (req, res) => {
  const { id: _id } = req.params;
  const game = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).json({
        success: false,
        error: "File Not Found",
      });
    }

    const updatedGame = await Game.findByIdAndUpdate(_id, game, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      data: updatedGame,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};

exports.chooseTeam = async (req, res) => {
  const { gameId, team, userId } = req.body;
  let homeTeamPicksClone;
  let awayTeamPicksClone;
  let chosenTeamClone;
  let notChosenTeamClone;
  let newGame;
  try {
    if (!mongoose.Types.ObjectId.isValid(gameId)) {
      return res.status(404).json({
        success: false,
        msg: "File Not Found",
      });
    }
    const gameById = await Game.findById(gameId);
    const d1 = gameById.lockTime;
    const d2 = new Date();

    if (d1.valueOf() > d2.valueOf()) {
      const { homeTeam, awayTeam } = gameById;
      if (team === "home-team") {
        if (gameById.homeTeam.picks.includes(userId)) {
          return res.status(200).json({
            success: true,
            data: gameById,
          });
        }

        homeTeamPicksClone = [...gameById.homeTeam.picks, userId];
        chosenTeamClone = { ...homeTeam, picks: homeTeamPicksClone };
        awayTeamPicksClone = gameById.awayTeam.picks.filter((id) => {
          return id !== userId;
        });
        notChosenTeamClone = { ...awayTeam, picks: awayTeamPicksClone };
        newGame = {
          ...gameById._doc,
          homeTeam: chosenTeamClone,
          awayTeam: notChosenTeamClone,
        };
      } else if (team === "away-team") {
        if (gameById.awayTeam.picks.includes(userId)) {
          return res.status(200).json({
            success: true,
            data: gameById,
          });
        }
        awayTeamPicksClone = [...gameById.awayTeam.picks, userId];
        chosenTeamClone = { ...awayTeam, picks: awayTeamPicksClone };
        homeTeamPicksClone = gameById.homeTeam.picks.filter((id) => {
          return id !== userId;
        });
        notChosenTeamClone = { ...homeTeam, picks: homeTeamPicksClone };
        newGame = {
          ...gameById._doc,
          awayTeam: chosenTeamClone,
          homeTeam: notChosenTeamClone,
        };
      }

      const updatedGame = await Game.findByIdAndUpdate(gameId, newGame, {
        new: true,
      });
      return res.status(200).json({
        success: true,
        data: updatedGame,
      });
    } else {
      return res.status(400).json({
        success: false,
        msg: "Too Late Son",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      msg: err,
    });
  }
};

exports.deleteGame = async (req, res) => {
  try {
    const game = Game.findById(req.body.params);
    if (!game) {
      return res.status(404).json({
        success: false,
        msg: "File Not Found",
      });
    }
    await game.remove();
    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: err,
    });
  }
};
