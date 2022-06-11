const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  addGame,
  getGames,
  chooseTeam,
  deleteGame,
  updateGame,
} = require("../controllers/gameController");

router.route("/").post(addGame).get(auth, getGames).patch(auth, chooseTeam);

router.route("/:id").delete(deleteGame).patch(auth, updateGame);

module.exports = router;
