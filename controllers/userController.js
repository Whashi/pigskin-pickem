const mongoose = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const { setWins } = require("./winController");

dotenv.config({ path: "./config/config.env" });

exports.addUser = async (req, res) => {
  try {
    let newUserInput = {
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    };
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUserInput.password, salt, (err, hash) => {
        newUserInput = { ...newUserInput, password: hash };
        User.create(newUserInput);
        return res.status(200).json({
          success: true,
          data: newUserInput,
        });
      });
    });
  } catch (err) {
    if (err.name === "Validation Error") {
      const messages = Object.values(err.errors).map((val) => val.message);
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

exports.getUserId = async (req, res) => {
  try {
    await User.findOne({ email: req.body.email }, (err, docs) => {
      if (!docs) {
        return res.status(404).json({
          success: false,
          msg: "User Not Found",
        });
      }
      bcrypt.compare(req.body.password, docs.password, (err, match) => {
        if (match) {
          jwt.sign(
            { id: docs.id },
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) {
                throw err;
              }
              return res.status(200).json({
                token,
                success: true,
                id: docs._id,
                auth: docs.auth,
                user: docs.userName,
                wins: docs.wins,
              });
            }
          );
        } else {
          return res.status(400).json({
            success: false,
            msg: "Wrong Password",
          });
        }
      });
    }).clone();
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
  setWins();
};

// need to make a seperate getUser for login and veiwing other profiles

exports.getLoggedInUser = async (req, res) => {
  try {
    const userData = await User.findById(req.params.id);
    if (!userData) {
      return res.status(404).json({
        success: false,
        msg: "User Not Found",
      });
    }
    return res.status(200).json({
      success: true,
      data: userData,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userData = await User.findById(req.params.id);
    if (!userData) {
      return res.status(404).json({
        success: false,
        msg: "User Not Found",
      });
    }

    const { userName, id, wins } = userData;

    return res.status(200).json({
      success: true,
      data: { userName, id, wins },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const usersInfo = await User.find({ auth: 0 });
    const users = usersInfo.map((user) => {
      return { userName: user.userName, userId: user.id, wins: user.wins };
    });
    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};

exports.updateUser = async (req, res) => {
  const { id: _id } = req.params;
  const user = req.body;
  console.log(_id);
  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).json({
        success: false,
        error: "File Not Found",
      });
    }
    const updatedUser = await User.findByIdAndUpdate(_id, user, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const UserData = Profile.findById(req.params.id);
    if (!UserData) {
      return res.status(404).json({
        success: false,
        error: "File Not Found",
      });
    }
    await UserData.remove();
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

exports.changePassword = async (req, res) => {
  const { id } = req.params;
  const newInputPassword = req.body.password;
  try {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newInputPassword, salt, (err, hash) => {
        User.findByIdAndUpdate({ _id: id }, { password: hash }, (err, docs) => {
          if (err) {
            console.log(err);
          } else {
            console.log(docs);
          }
        });
        return res.status(200).json({
          success: true,
        });
      });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};
