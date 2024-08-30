const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  hashedPassword: { type: String, required: true },
  dogsFollowed: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }],
  appointmentsMade: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
