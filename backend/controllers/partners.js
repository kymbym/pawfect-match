const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Partner = require("../models/Partner");
const { verifyToken } = require("../middleware/partner-verify-token")

const SALT_LENGTH = 12;

const createJWT = (partner) => {
    const payload = { organizationName: partner.organizationName, _id: partner._id };
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: "2h" };
    return jwt.sign(payload, secret, options);
}

router.post("/signup", async (req, res) => {
    const { organizationName, email, password } = req.body;

    try {
        const partnerInDatabase = await Partner.findOne({ email });

        if (partnerInDatabase) {
            return res.status(400).json({ error: "email already in use" })
        }

        const hashedPassword = bcrypt.hashSync(password, SALT_LENGTH);
        const partner = await Partner.create({
            organizationName,
            email,
            hashedPassword
        });
        
        const token = createJWT(partner)
        res.status(201).json({ partner, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

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

router.get("/:partnerId", verifyToken, async (req, res) => {
  try {
    if (req.partner._id !== req.params.partnerId) {
      return res.status(401).json({ error: "unauthorized" });
    }
    const partner = await Partner.findById(req.partner._id);
    if (!partner) {
      res.status(404);
      throw new Error("profile not found");
    }
    res.json({ partner });
  } catch (error) {
    if (res.statusCode === 404) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

module.exports = router;

