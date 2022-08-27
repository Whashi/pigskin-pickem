const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  addGame,
  getGame,
  getGames,
  chooseTeam,
  deleteGame,
  updateGame,
} = require("../controllers/gameController");

router.route("/").post(addGame).get(auth, getGames).patch(auth, chooseTeam);

router.route("/:id").get(auth, getGame).patch(auth, updateGame).delete(deleteGame);

module.exports = router;
