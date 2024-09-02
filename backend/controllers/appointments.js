const express = require("express");
const {
  verifyToken,
  getUser,
  getPartner,
} = require("../middleware/verify-token");
const Appointment = require("../models/Appointment");
const Pet = require("../models/Pet");
const router = express.Router();

// Protected Routes
router.use(verifyToken);

// make appointment
router.post("/", async (req, res) => {
  if (getPartner(req)) {
    return res
      .status(403)
      .json({ error: "Unauthorized to make appointments as Partner!" });
  }
  const currentUser = getUser(req);
  const petId = req.body.pet;
  try {
    if (!petId) {
      return res.status(400).json({ error: "No pet Id" });
    }

    const selectedPet = await Pet.findById(petId);

    if (!selectedPet) {
      return res.status(400).json({ error: "Pet not found" });
    }
    req.body.adopter = currentUser._id;
    req.body.pet = selectedPet._id;
    req.body.provider = selectedPet.provider;

    const appointment = await Appointment.create(req.body);

    appointment._doc.adopter = currentUser;
    appointment._doc.pet = selectedPet;
    appointment._doc.provider = selectedPet.provider;

    res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// gets all appointments
router.get("/", async (req, res) => {
  try {
    if (getPartner(req)) {
      const appointmentsReceived = await Appointment.find({
        provider: req.partner._id,
      }).populate("pet");
      res.status(200).json(appointmentsReceived);
    }
    // show all appointments made by me (user):
    if (getUser(req)) {
      const allAppointments = await Appointment.find({ adopter: req.user._id })
        .populate("adopter")
        .populate("pet")
        .exec();
      res.status(200).json(allAppointments);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// view specific appointment
router.get("/:appointmentId", async (req, res) => {
  const { appointmentId } = req.params;
  try {
    if (getUser(req)) {
      const appointment = await Appointment.findById(appointmentId)
        .populate("adopter")
        .populate("pet")
        .exec();
      if (appointment === null) {
        return res.status(404).json({ error: "Cannot find appointment" });
      }
      res.status(200).json(appointment);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// edit appointment
router.put("/:appointmentId", async (req, res) => {
  if (getPartner(req)) {
    return res
      .status(403)
      .json({ error: "Unauthorized to edit appointments as Partner!" });
  }

  const { appointmentId } = req.params;
  const currentUser = getUser(req);

  try {
    const appointment = await Appointment.findById(appointmentId);

    if (appointment === null) {
      return res.status(404).json({ error: "Cannot find appointment" });
    }

    if (!appointment.adopter.equals(currentUser._id)) {
      return res.status(403).json({ error: "Unauthorized attempt" });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.appointmentId,
      req.body,
      { new: true },
    );

    updatedAppointment._doc.adopter = currentUser;

    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// delete appointment
router.delete("/:appointmentId", async (req, res) => {
  if (getPartner(req)) {
    return res
      .status(403)
      .json({ error: "Unauthorized to delete appointments as Partner!" });
  }

  const { appointmentId } = req.params;
  const currentUser = getUser(req);

  try {
    const appointment = await Appointment.findById(appointmentId);
    if (appointment === null) {
      return res.status(404).json({ error: "Cannot find appointment" });
    }

    if (!appointment.adopter.equals(currentUser._id)) {
      return res.status(403).json({ error: "Unauthorized attempt" });
    }

    const deletedAppointment =
      await Appointment.findByIdAndDelete(appointmentId);

    res.status(200).json(deletedAppointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
