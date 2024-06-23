const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();
const auth = async (req, res, next) => {
  try {
    if (
      req?.header("Authorization") &&
      req?.header("Authorization")?.split(" ")?.length > 1
    ) {
      const token = req.header("Authorization").split(" ")[1];
      if (!token) {
        return res
          .status(401)
          .json({ message: "No token, authorization denied" });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded).select("-password");
      next();
    } else {
      res.status(401).json({ message: "Authorization Failed" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = auth;
