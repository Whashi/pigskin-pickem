const mongoose = require("mongoose") ;

const GameSchema = new mongoose.Schema({
  weekNumber: Number,
  lockTime: Date,
  homeTeam: {
    name: String,
    picks: [String],
  },
  awayTeam: {
    name: String,
    picks: [String],
  },
});

module.exports = mongoose.model("Game", GameSchema);
