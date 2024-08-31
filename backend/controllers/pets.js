const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Pet = require("../models/Pet");
const { verifyToken } = require("../middleware/verify-token");
const { default: mongoose } = require("mongoose");

// get pets
router.get("/", verifyToken, async (req, res) => {
  const { _id } = req.partner || req.user;
  // console.log("partner id from token", req.partner._id);

  try {
    let pets = [];

    if (req.partner) {
      pets = await Pet.find({ provider: _id });
    } else {
      pets = await Pet.find({}); // user get all pets uploaded from all providers
    }

    res.status(200).json({ pets });
  } catch (error) {
    console.error("error fetching pets from api/pets", error);
    res.status(400).json({ error: error.message });
  }
});

// upload new pet
router.post("/", verifyToken, async (req, res) => {
  const { _id } = req.partner;
  const petData = req.body;

  try {
    if (!req.partner) {
      return res.status(403).json({ error: "unauthorized! not allowed to upload" });
    }

    const pet = new Pet({ ...petData, provider: _id });
    await pet.save();

    return res.status(201).json({ msg: "pet added successfully", petId: pet._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// get pet by id
router.get("/:petId", verifyToken, async (req, res) => {
  const { petId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(petId)) {
      return res.status(400).json({ msg: "invalid pet id" });
    }

    const pet = await Pet.findById(petId);

    if (!pet) {
      return res.status(404).json({ error: "pet not found" });
    }

    if (req.partner) {
      if (!pet.provider.equals(req.partner._id)) {
        return res.status(403).json({ error: "unauthorized! not allowed to edit" });
    }
    res.status(200).json({ pet });
      } else {
        res.status(200).json({}) // user gets specific pet data by id. write code here
      }
    } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// edit pet
router.put("/:petId", verifyToken, async (req, res) => {
  const { petId } = req.params;
  const updates = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(petId)) {
      return res.status(400).json({ msg: "invalid pet id" });
    }

    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ error: "pet not found" });
    }

    if (!pet.provider.equals(req.partner._id)) {
      return res.status(403).json({ error: "unauthorized! not allowed to edit" });
    }

    const updatedPet = await Pet.findByIdAndUpdate(petId, updates, {
      new: true,
    });
    res.status(200).json({ msg: "pet updated successfully ", updatedPet });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// delete pet
router.delete("/:petId", verifyToken, async (req, res) => {
  const { petId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(petId)) {
      return res.status(400).json({ msg: "invalid pet id" });
    }

    const pet = await Pet.findById(petId);

    if (!pet) {
      return res.status(404).json({ error: "pet not found" });
    }

    if (!req.partner) {
      if (!pet.provider.equals(req.partner._id)) {
        return res.status(403).json({ error: "unauthorized! not allowed to edit" });
      }
    }

    const deletedPet = await Pet.findByIdAndDelete(petId);
    res.status(200).json({ msg: "pet deleted successfully", deletedPet });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
