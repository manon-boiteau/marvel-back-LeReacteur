// Packages - import
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

// Packages - initialization
const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to Marvel API 👉🏻 Manon x lereacteur !" });
});

// -------------------------------------

app.get("/comics", async (req, res) => {
  try {
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;

    // Get a list of comics from Marvel API 🥷🏼
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}&limit=${limit}&skip=${skip}`
    );

    const comics = response.data;

    res.status(200).json(comics);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/characters", async (req, res) => {
  try {
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;

    // Get a list of characters from Marvel API 🧟‍♀️
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}&limit=${limit}&skip=${skip}`
    );

    const characters = response.data;

    res.status(200).json(characters);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/comics/:characterId", async (req, res) => {
  try {
    // Get a list of comics containing a specific character from Marvel API 🦹🏻‍♀️
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${process.env.MARVEL_API_KEY}`
    );

    const comicsOfCharacter = response.data;

    res.status(200).json(comicsOfCharacter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// -------------------------------------

app.all("*", (req, res) => {
  res.status(404).json({ message: "This endpoint does not exist 🥺" });
});

app.listen(process.env.PORT || 3001, () => {
  console.log("Server says 'hello' 🥰");
});
