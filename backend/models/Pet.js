const mongoose = require("mongoose");

const genderEnums = ["Male", "Female"];

const colorEnums = [
  "Black",
  "Blue Merle",
  "Brindle",
  "Brown",
  "Cream",
  "Gray",
  "Tan",
  "White",
];

const personalityEnums = [
  "Affectionate",
  "Calm",
  "Energetic",
  "Friendly",
  "Gentle",
  "Loyal",
  "Playful",
];

const petSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    breed: { type: String, required: true },
    gender: { type: String, required: true, enum: genderEnums },
    birthday: { type: Date, required: true },
    color: { type: String, required: true, enum: colorEnums },
    medicalHistory: {
      sterilized: { type: Boolean, required: true },
      vaccinated: { type: Boolean, required: true },
    },
    personality: { type: String, required: true, enum: personalityEnums },
    photos: [{ type: String }],
    profilePhoto: { type: String },
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Partner",
      required: true,
    },
    adoptionStage: { type: String, required: true },
  },
  { timestamps: true },
);

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
