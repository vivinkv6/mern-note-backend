const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }
    const user = new User({ name, email, password });

    await user.save();
    const token = jwt.sign(user.id, process.env.JWT_SECRET);
    res.status(201).json({ token, user: { id: user.id, name, email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ email: "Please Enter Valid Email" });
    }
    //check if the password is correct or not
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ password: "Wrong Password" });
    }

    const token = jwt.sign(user.id, process.env.JWT_SECRET);
    res
      .status(200)
      .json({ token, user: { id: user.id, name: user?.name, email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
