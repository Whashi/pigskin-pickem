const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({
      msg: "No token",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({
      msg: "Invalid Token",
    });
  }
};

module.exports = auth;
