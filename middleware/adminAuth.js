const Admin = require("../models/admins");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("AdminAuthorization").replace("Bearer ", "");
    const decode = jwt.verify(token, "venividivici");
    const result = await Admin.findOne({ _id: decode._id, "tokens.token": token });

    if (!admin) {
      throw { message: "Admin doesn't exist" };
    }

    req.token = token;
    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).send({ message: "Please authenticate" });
  }
};

module.exports = auth;
