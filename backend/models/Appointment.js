const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  adopter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  pet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet" },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: "Partner" },
  contact: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  appointmentTime: { type: String, required: true },
  inquiries: String,
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
