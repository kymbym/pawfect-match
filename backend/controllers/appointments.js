const express = require("express");
const { verifyToken, getUser } = require("../middleware/user-verify-token");
const Appointment = require("../models/Appointment");
const router = express.Router();

// Protected Routes
router.use(verifyToken);

//include partner and pet later
//make appointment:
router.post("/", async (req, res) => {
  const currentUser = getUser(req);
  req.body.adopter = currentUser._id;
  const appointment = await Appointment.create(req.body);
  appointment._doc.adopter = currentUser;
  res.status(201).json(appointment);
});

//show all appointments made by me (user):
router.get("/", async (req, res) => {
  const allAppointments = await Appointment.find({}).populate("adopter").exec();
  res.status(200).json(allAppointments);
});

//view specific appointment:
router.get("/:appointmentId", async (req, res) => {
  const { appointmentId } = req.params;
  const appointment = await Appointment.findById(appointmentId)
    .populate("adopter")
    .exec();
  res.status(200).json(appointment);
});

//edit appointment:
router.put("/:appointmentId", async (req, res) => {
  const { appointmentId } = req.params;
  const currentUser = getUser(req);
  const appointment = await Appointment.findById(appointmentId);
  if (appointment === null) {
    return res.status(404).json({ error: "Cannot find appointment" });
  }
  const updatedAppointment = await Appointment.findByIdAndUpdate(
    req.params.appointmentId,
    req.body,
    { new: true },
  );
  updatedAppointment._doc.adopter = currentUser;
  res.status(200).json(updatedAppointment);
});

//delete appointment
router.delete("/:appointmentId", async (req, res) => {
  const { appointmentId } = req.params;
  const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);
  res.status(200).json(deletedAppointment);
});

module.exports = router;
