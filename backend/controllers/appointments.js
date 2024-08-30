const express = require("express");
const { verifyToken, getUser } = require("../middleware/user-verify-token");
const Appointment = require("../models/Appointment");
const router = express.Router();

// Protected Routes
router.use(verifyToken);

router.post("/", async (req, res) => {
  const currentUser = getUser(req);
  req.body.adopter = currentUser._id;
  const appointment = await Appointment.create(req.body);
  appointment._doc.adopter = currentUser;
  res.status(201).json(appointment);
});

module.exports = router;
