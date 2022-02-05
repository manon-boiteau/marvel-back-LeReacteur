const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(formidable());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const marvelsRoute = require("./routes/marvels");
app.use(marvelsRoute);
const userRoute = require("./routes/user");
app.use(userRoute);

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to Marvel API 👉🏻 Manon x lereacteur !" });
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "This endpoint does not exist 🥺" });
});

app.listen(process.env.PORT || 3001, () => {
  console.log("Server says 'hello' 🥰");
});
