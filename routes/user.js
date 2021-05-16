// Express - import
const express = require("express");
const router = express.Router();

// Import - Models
const User = require("../models/User");

// Authentification packages - import
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

// Signup endpoints
router.post("/user/signup", async (req, res) => {
  try {
    const { email, username, password } = req.fields;

    const userToFind = await User.findOne({ email: email });

    // Create user's salt / hash / token
    if (username && password) {
      if (!userToFind) {
        const salt = uid2(16);

        const hash = SHA256(password + salt).toString(encBase64);

        const token = uid2(64);

        const newUser = new User({
          email: email,
          username: username,
          token: token,
          hash: hash,
          salt: salt,
        });

        await newUser.save();

        // Response without hash and salt
        res.status(200).json({
          _id: newUser._id,
          token: token,
          username: username,
        });
      } else {
        res.status(409).json({ message: "This email already exists." });
      }
    } else {
      res.status(400).json({ message: "You missed some parameters." });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login endpoints
router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.fields;

    const userToFind = await User.findOne({ email: email });

    if (email && password && userToFind) {
      const newHash = SHA256(password + userToFind.salt).toString(encBase64);

      if (userToFind.hash === newHash) {
        res.status(200).json({
          _id: userToFind._id,
          token: userToFind.token,
          username: userToFind.username,
        });
      } else {
        res.status(400).json({ message: "Unauthorized connexion." });
      }
    } else {
      res.status(400).json({ message: "Unauthorized connexion." });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Export - endpoints
module.exports = router;
