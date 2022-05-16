const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  addGame,
  getGames,
  updateGame,
  deleteGame,
} = require("../controllers/gameController");

router.route("/").post(addGame).get(auth, getGames);

router.route("/:id").delete(deleteGame).patch(updateGame);

module.exports = router;
