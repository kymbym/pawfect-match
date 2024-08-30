const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const usersRouter = require("./controllers/users");
const User = require("./models/User");

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const app = express();

app.use(morgan("dev"));
app.use(express.static("../frontend/dist"));
app.use(express.json());

//routes here:
app.use("/api/user", usersRouter);

app.listen(3000, () => {
  console.log("The express app is ready!");
});
