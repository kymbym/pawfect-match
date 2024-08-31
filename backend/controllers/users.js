const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { verifyToken } = require("../middleware/verify-token");
const mongoose = require("mongoose")

const SALT_LENGTH = 12;

const createJWT = (user) => {
  const payload = {
    userName: user.userName,
    email: user.email,
    _id: user._id,
  };
  const secret = process.env.JWT_SECRET;
  const options = { expiresIn: "2h" };
  return jwt.sign(payload, secret, options);
};

router.post("/signup", async (req, res) => {
  console.log(req.body);
  const { userName, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "This account already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_LENGTH);
    const user = await User.create({ userName, email, hashedPassword });
    const token = createJWT(user);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && bcrypt.compare(password, user.hashedPassword)) {
      const token = createJWT(user);
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:userId", verifyToken, async (req, res) => {
  try {
    if (req.user._id !== req.params.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404);
      throw new Error("Please sign in again.");
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
