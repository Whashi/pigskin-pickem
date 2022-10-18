const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: String,
  auth: { type: Number, default: 0 },
  email: {
    type: String,
    unique: true,
  },
  password: String,
  wins: [Object],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
