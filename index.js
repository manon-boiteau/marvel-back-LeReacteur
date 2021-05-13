// Packages - import
const express = require("express");
const axios = require("axios");
const cors = require("cors");

// Packages - initialisation
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
    // Get a list of comics from Marvel API 🥷🏼
    const response = await axios.get(
      "https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=neJMNDqm1EgNzFoY"
    );

    // let filters = {};

    // if (req.query.title) {
    //   filters.comic_title = new RegExp(req.query.title, "i");
    // }

    // let sort = {};

    // if (req.query.sort === "aZ") {
    //   sort.title = "asc";
    // }

    // if (req.query.sort === "zA") {
    //   sort.title = "desc";
    // }

    const comics = response.data;

    res.status(200).json(comics);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/characters", async (req, res) => {
  try {
    // Get a list of characters from Marvel API 🧟‍♀️
    const response = await axios.get(
      "https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=neJMNDqm1EgNzFoY"
    );

    // let filters = {};

    // if (req.query.name) {
    //   filters.name = new RegExp(req.query.name, "i");
    // }

    // let sort = {};

    // if (req.query.sort === "aZ") {
    //   sort.name = "asc";
    // }

    // if (req.query.sort === "zA") {
    //   sort.name = "desc";
    // }

    // let page;
    // if (Number(req.query.page) < 1) {
    //   page = 1;
    // } else {
    //   page = Number(req.query.page);
    // }

    // let limit = Number(req.query.limit);

    const characters = response.data;

    res.status(200).json(characters);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/comics/:characterId", async (req, res) => {
  try {
    // console.log(req.params);

    // Get a list of comics containing a specific character from Marvel API 🦹🏻‍♀️
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=neJMNDqm1EgNzFoY`
    );

    const comicsOfCharacter = response.data;

    res.status(200).json(comicsOfCharacter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// -------------------------------------

app.all("*", (req, res) => {
  res.status(404).json({ message: "This endpoint does not exist." });
});

app.listen(process.env.PORT || 3001, () => {
  console.log("Server says 'hello' 🥰");
});
