const jwt = require("jsonwebtoken");
const Admin = require('../models/admins')
const User = require('../models/users')

module.exports = (type) => async (req, res, next) => {

  const header = type === "admin" ? "AdminAuthorization" : "UserAuthorization";
  const model = type === 'admin' ? Admin : User
  
  try {
      const token = req.header(header).replace("Bearer ", "");
      const decode = jwt.verify(token, "venividivici");
      const result = await model.findOne({ _id: decode._id, "tokens.token": token });
      if (!result) {
          throw { message: type + " doesn't exist" };
        }
    req.token = token;
    req[type] = result;
    next();
  } catch (error) {
    res.status(401).send({ message: "Please authenticate" });
  }
};
