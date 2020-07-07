const jwt = require("jsonwebtoken");
const Admin = require("../models/admins");

module.exports = (name,model,header) => async (req, res, next) => {
  try {
      const token = req.header(header).replace("Bearer ", "");
      const decode = jwt.verify(token, "venividivici");
      const result = await model.findOne({ _id: decode._id, "tokens.token": token });
      if (!result) {
          throw { message: name + " doesn't exist" };
        }
    req.token = token;
    req[name] = result;
    next();
  } catch (error) {
    res.status(401).send({ message: "Please authenticate" });
  }
};
