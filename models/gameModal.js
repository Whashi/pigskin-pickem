const mongoose = require("mongoose") ;

const GameSchema = new mongoose.Schema({
  weekNumber: Number,
  lockTime: Date,
  homeTeam: {
    name: String,
    picks: [String],
    won: {
      type: Boolean,
      default: false
    }
  },
  awayTeam: {
    name: String,
    picks: [String],
    won: {
      type: Boolean,
      default: false
    }
  },
});

module.exports = mongoose.model("Game", GameSchema);
