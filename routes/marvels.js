const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/comics", async (req, res) => {
  try {
    // Filters
    const title = req.query.title;
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;

    // Get a list of comics from Marvel API 🥷🏼
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}&limit=${limit}&skip=${skip}&title=${title}`
    );

    const comics = response.data;

    res.status(200).json(comics);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/characters", async (req, res) => {
  try {
    // Filters
    let name = req.query.name;
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;

    // Get a list of characters from Marvel API 🧟‍♀️
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}&limit=${limit}&skip=${skip}&name=${name}`
    );

    const characters = response.data;

    res.status(200).json(characters);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/comics/:characterId", async (req, res) => {
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

module.exports = router;
