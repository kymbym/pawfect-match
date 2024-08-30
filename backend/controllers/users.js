const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { verifyToken } = require("../middleware/user-verify-token");

const SALT_LENGTH = 12;

router.post("/signup", async (req, res) => {
  const { userName, email, hashedPassword } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "This account already exists!" });
    }

    const hashedPassword = await bcrypt.hash(
      req.body.hashedPassword,
      SALT_LENGTH,
    );
    const user = await User.create({ userName, email, hashedPassword });
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "5m", //after testing, change to "1h"
    });
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { userName, email, hashedPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && bcrypt.compare({ hashedPassword }, user.hashedPassword)) {
      const token = jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: "5m",
      });
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
