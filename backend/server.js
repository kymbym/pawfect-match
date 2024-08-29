const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.static("../frontend/dist"));
const partnersRouter = require("./controllers/partners");

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());

app.use("/api/partner", partnersRouter);

app.listen(3000, () => {
  console.log("The express app is ready!");
});
