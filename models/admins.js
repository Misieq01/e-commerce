const mongoose = require('mongoose')
const authPlugin = require('../plugins/auth_plugin')
const bcryptjs = require('bcryptjs')


const adminSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, trim: true },
  read: { type: Boolean, required: true },
  write: { type: Boolean, required: true },
  execute: { type: Boolean, required: true }, 
  tokens: [
    {token: { type: String}}
  ]
});

adminSchema.plugin(authPlugin)

adminSchema.statics.findAdmin = async (name, password) => {

  //Finding user by his name
  const admin = await Admin.findOne({ name });
  if (!admin) {
    throw { message: "There is no admin with this name", data: "name" };
  }
  //Checking for correct password
  const isMatch = await bcryptjs.compare(password, admin.password);
  if (!isMatch) {
    throw { message: "Incorect password", data: "password" };
  }

  //If all good send back admin
  return admin;
};

// userSchema.statics.validate = async (data) => {
//   const { name, password } = data;
//   const user = await User.findOne({ name: name });
//   if (!user) throw { message: "Inncorrect name", data: "name" };
//   if (user.password !== password) throw { message: "Incorect password", data: "password" };
// };   


const Admin = mongoose.model('Admin',adminSchema)

module.exports = Admin