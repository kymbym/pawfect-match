const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.static("../frontend/dist"));

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());

//routes here:
app.use("/user", usersRouter);

app.listen(3000, () => {
  console.log("The express app is ready!");
});
