const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  color: { type: String, required: true },
  medicalHistory: {
    sterilized: { type: Boolean, required: true },
    vaccinated: { type: Boolean, required: true }
  },
  personality: { type: String, required: true },
  photos: [
    {url: { type: String, required: true }}
  ],
  profilePhoto: { type: String },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: "Partner", required: true },
  adoptionStage: { type: String, required: true }
});

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
