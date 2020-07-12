const express = require("express");
const Admin = require("../models/admins");
const Authentication = require("../middleware/auth")("admin", Admin, "AdminAuthorization");

const router = express.Router();

router.post("/Admin/secret/ttt/add", async (req, res) => {
  try {
    const admin = new Admin(req.body);
    admin.save();
    res.send("success");
  } catch (error) {
    res.send(error);
  }
});

router.post("/Admin/Login", async (req, res) => {
  try {
    const { name, password } = req.body;

    const admin = await Admin.findAdmin(name, password);

    const token = await admin.generateAuthToken();

    res.status(200).send(token);
  } catch (error) {
    res.status(400).send({ message: error.message, data: error.data });
  }
});
router.post("/Admin/Logout", Authentication, async (req, res) => {
  try {
    req.admin.tokens = req.admin.tokens.filter((token) => token.token !== req.token);
    await req.admin.save();
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/Admin/Account", Authentication, async (req, res) => {
  res.send(req.admin);
});

module.exports = router;
