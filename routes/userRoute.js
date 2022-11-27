const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");

const {
  addUser,
  getLoggedInUser,
  getUser,
  getAllUsers,
  getUserId,
  updateUser,
  deleteUser,
  changePassword,
} = require("../controllers/userController");

router.route("/").get(getAllUsers).post(addUser);

router
  .route("/:id")
  .delete(auth, deleteUser)
  .patch(auth, updateUser)
  .get(auth, getLoggedInUser);

router.route("/get-user/:id").get(auth, getUser);

router.route("/reset-password/:id").patch(auth, changePassword);

router.route("/login").post(getUserId);

module.exports = router;
