const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  adopter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  pet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet" },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: "Partner" },
  contact: { type: String, required: true },
  appointmentDate: { type: String, required: true },
  appointmentTime: { type: String, required: true },
  inquiries: String,
}); //change date and time to type: Date

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
