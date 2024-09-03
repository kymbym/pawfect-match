const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Pet = require("../models/Pet");
const Appointment = require("../models/Appointment");
const { verifyToken } = require("../middleware/verify-token");
const { default: mongoose } = require("mongoose");

// get pets
router.get("/", verifyToken, async (req, res) => {
  const { _id } = req.partner || req.user;
  // console.log("partner id from token", req.partner._id);
  const { name, sort } = req.query;
  console.log("received sort query", sort);
  // console.log("search query in router: ", name)
  try {
    let pets = [];
    let sortBy = {};

    if (sort === "latest") {
      sortBy = { createdAt: -1 };
    } else if (sort === "earliest") {
      sortBy = { createdAt: 1 };
    }

    if (req.partner) {
      if (name) {
        pets = await Pet.find({ provider: _id, name: String(name) })
          .sort(sortBy)
          .exec();
      } else {
        pets = await Pet.find({ provider: _id }).sort(sortBy).exec();
      }
    } else if (req.user) {
      if (name) {
        pets = await Pet.find({ name: String(name) }); // user gets pet by name
      } else {
        pets = await Pet.find({}); // user gets everything if no search
      }
    }

    res.status(200).json({ pets });
  } catch (error) {
    console.error("error fetching pets from api/pets", error);
    res.status(400).json({ error: error.message });
  }
});

// filter search categories (cannot use get, must post)
router.post("/filter", verifyToken, async (req, res) => {
  console.log("filtered req.body", req.body);
  const pets = await Pet.find({
    $and: [
      //check if have this field or not. if dont have, give empty object
      req.body.gender ? { gender: req.body.gender } : {},
      req.body.color ? { color: req.body.color } : {},
      req.body.personality ? { personality: req.body.personality } : {},
    ],
  });
  console.log("query result", pets);
  try {
    if (req.partner) {
      // if partner cannot search
      return res
        .status(403)
        .json({ error: "unauthorized! not allowed to search" });
    }
    res.status(200).json({ pets });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// upload new pet
router.post("/", verifyToken, async (req, res) => {
  const { _id } = req.partner;
  const petData = req.body;

  try {
    if (!req.partner) {
      return res
        .status(403)
        .json({ error: "unauthorized! not allowed to upload" });
    }

    const pet = new Pet({ ...petData, provider: _id });
    await pet.save();

    return res
      .status(201)
      .json({ msg: "pet added successfully", petId: pet._id });
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

    const appointments = await Appointment.find({ pet: petId }).populate(
      "adopter",
    );

    console.log("fetched pet data from backend route", pet);

    if (req.partner) {
      if (!pet.provider.equals(req.partner._id)) {
        return res
          .status(403)
          .json({ error: "unauthorized! not allowed to edit" });
      }
      res.status(200).json({ pet, appointments });
    } else {
      res.status(200).json({ pet }); // user gets specific pet data by id. write code here
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
      return res
        .status(403)
        .json({ error: "unauthorized! not allowed to edit" });
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
        return res
          .status(403)
          .json({ error: "unauthorized! not allowed to edit" });
      }
    }

    const deletedPet = await Pet.findByIdAndDelete(petId);
    res.status(200).json({ msg: "pet deleted successfully", deletedPet });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// delete photo of specific pet
router.delete("/:petId/delete-photo", async (req, res) => {
  const { petId } = req.params;
  const { photoUrl } = req.body;

  try {
    const pet = await Pet.findById(petId);

    if (!pet) {
      return res.status(404).json({ error: "pet not found" });
    }

    pet.photos = pet.photos.filter((photo) => photo !== photoUrl);
    await pet.save();

    res
      .status(200)
      .json({ msg: "pet photo deleted successfully", photos: pet.photos });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
