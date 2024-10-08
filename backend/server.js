const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.static("../frontend/dist"));
const partnersRouter = require("./controllers/partners");
const usersRouter = require("./controllers/users");
const petsRouter = require("./controllers/pets");
const appointmentsRouter = require("./controllers/appointments");

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());

app.use("/api/partner", partnersRouter);
app.use("/api/pets", petsRouter);

app.use("/api/user", usersRouter);
app.use("/api/appointments", appointmentsRouter);

app.listen(3000, () => {
  console.log("The express app is ready!");
});
