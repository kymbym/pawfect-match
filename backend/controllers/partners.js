const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Partner = require("../models/Partner");
const Pet = require("../models/Pet");
const { verifyToken } = require("../middleware/partner-verify-token");
const { default: mongoose } = require("mongoose");

const SALT_LENGTH = 12;

const createJWT = (partner) => {
  const payload = {
    organizationName: partner.organizationName,
    _id: partner._id,
  };
  const secret = process.env.JWT_SECRET;
  const options = { expiresIn: "2h" };
  return jwt.sign(payload, secret, options);
};

// partner signup
router.post("/signup", async (req, res) => {
  const { organizationName, email, password } = req.body;

  try {
    const partnerInDatabase = await Partner.findOne({ email });

    if (partnerInDatabase) {
      return res.status(400).json({ error: "email already in use" });
    }

    const hashedPassword = bcrypt.hashSync(password, SALT_LENGTH);
    const partner = await Partner.create({
      organizationName,
      email,
      hashedPassword,
    });

    const token = createJWT(partner);
    return res.status(201).json({ partner, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// partner login
router.post("/login", async (req, res) => {
  const { organizationName, password } = req.body;

  try {
    const partner = await Partner.findOne({ organizationName });
    if (partner === null) {
      return res.status(401).json({ error: "no such organization" });
    }
    const match = await bcrypt.compare(password, partner.hashedPassword);
    if (match) {
      const token = createJWT(partner);
      return res.status(200).json({ token });
    }
    res.status(401).json({ error: "invalid email or password" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// verify partner token
router.get("/:partnerId", verifyToken, async (req, res) => {
  try {
    const { _id } = req.partner;
    if (_id !== req.params.partnerId) {
      return res.status(401).json({ error: "unauthorized" });
    }
    const partner = await Partner.findById(req.partner._id);
    if (!partner) {
      res.status(404);
      throw new Error("profile not found");
    }
    return res.json({ partner });
  } catch (error) {
    if (res.statusCode === 404) {
      return res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// upload new pet
router.post("/pets", verifyToken, async (req, res) => {
  const { _id } = req.partner;
  const petData = req.body;

  try {
    const pet = new Pet({ ...petData, provider: _id });
    await pet.save();

    return res
      .status(201)
      .json({ msg: "pet added successfully", petId: pet._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// edit pet
router.put("/pets/:petId", verifyToken, async (req, res) => {
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
router.delete("/pets/:petId", verifyToken, async (req, res) => {
  const { petId } = req.params;

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

    const deletedPet = await Pet.findByIdAndDelete(petId);
    res.status(200).json({ msg: "pet deleted successfully", deletedPet });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
