const express = require("express");
const User = require("../models/users");
const Authentication = require("../middleware/auth")("user", User, "UserAuthorization");

const router = express.Router();

router.post("/Signup", async (req, res) => {
  try {
    const data = await User.validateRegister(req.body);

    const user = new User(data);
    await user.save();

    user.generateAuthToken();

    res.status(200).send(token);
  } catch (error) {
    res.status(400).send({ message: error.message, data: error.data });
  }
});

router.post("/Login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByCredentials(email, password);

    const token = await user.generateAuthToken();

    res.status(200).send(token);
  } catch (error) {
    res.status(400).send({ message: error.message, data: error.data });
  }
});

router.post("/Logout", Authentication, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);

    await req.user.save();

    req.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/Account", Authentication, async (req, res) => {
  res.send(req.user);
});

module.exports = router;
