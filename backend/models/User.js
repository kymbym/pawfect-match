const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  dogsFollowed: { type: mongoose.Schema.Types.ObjectId, ref: "Pet" },
  appointmentsMade: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
  },
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.password;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
