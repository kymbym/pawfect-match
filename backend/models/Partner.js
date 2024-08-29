const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema({
  organizationName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  hashedPassword: { type: String, required: true },
  appointmentsReceived: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }
],
});

partnerSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.password;
  },
});

const Partner = mongoose.model("Partner", partnerSchema);

module.exports = Partner;
