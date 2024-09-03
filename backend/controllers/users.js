const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Pet = require("../models/Pet");
const { verifyToken } = require("../middleware/verify-token");
const mongoose = require("mongoose");

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
      res.status(200).json({ user, token });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:userId", verifyToken, async (req, res) => {
  try {
    if (req.user._id.toString() !== req.params.userId) {
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

// user follows pets
router.put("/", verifyToken, async (req, res) => {
  console.log(req.user._id);
  console.log(req.body.userId);
  console.log(req.body.petId);

  try {
    /* notes don't delete!
    user.dogsFollowed.push(pet._id); - pushing the mongo object id. req.body.petId is a string. cannot work.
    user.dogsFollowed.push(req.body.petId); - pushing the mongo object id. req.body.petId is a string. cannot work.
    await User.findByIdAndUpdate(req.body.userId, user); -> alternative way to .save()
    */

    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(400).json({ error: "Profile not found" });
    }
    const pet = await Pet.findById(req.body.petId);
    const index = user.dogsFollowed.indexOf(req.body.petId);

    if (index !== -1) {
      user.dogsFollowed.splice(index, 1);
    } else {
      user.dogsFollowed.push(pet);
    }
    await user.save();
    res.status(200).json({ message: "Dog followed!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get user
router.get("/", verifyToken, async (req, res) => {
  try {
    const _id = req.user;
    const user = await User.findById(_id).populate("dogsFollowed"); //adds entire pet data into dogsFollowed
    if (!user) {
      return res.status(400).json({ error: "Profile not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
