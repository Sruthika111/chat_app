const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashed });

  await user.save();
  res.json({ message: "Registered successfully" });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json("Wrong password");

  const token = jwt.sign({ id: user._id }, "secret");

  res.json({ token, username: user.username });
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch {
    res.status(500).json("Error");
  }
});
module.exports = router;