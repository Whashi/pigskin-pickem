const mongoose = require("mongoose");
const Game = require("../models/gameModal");
const LockTimes = require("../config/gameLockTimes");

exports.addGame = async (req, res) => {
  try {
    console.log(req.body);
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
    const gameById = await Game.findById(_id);
    const d1 = LockTimes[gameById.weekNumber - 1];
    const d2 = new Date();

    if (d1.valueOf() > d2.valueOf()) {
      const updatedGame = await Game.findByIdAndUpdate(_id, game, {
        new: true,
      });
      return res.status(200).json({
        success: true,
        data: updatedGame,
      });
    } else {
      return res.status(400).json({
        success: false,
        error: "Too Late Son",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};

exports.deleteGame = async (req, res) => {
  try {
    const game = Game.findById(req.body.params);
    if (!game) {
      return res.status(404).json({
        success: false,
        error: "File Not Found",
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
      error: err,
    });
  }
};
