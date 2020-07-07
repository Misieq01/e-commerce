const mongoose = require('mongoose');
const chalk = require('chalk')
const bcryptjs = require("bcryptjs");

const authPlugin = require('../plugins/auth_plugin')

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true },
  orders: { type: mongoose.Schema.Types.ObjectId ,ref: 'Order'},
  tokens: [{ token: { type: String } }],
});

userSchema.plugin(authPlugin)

// Simple method to return full name of user
userSchema.methods.getFullName = function () {
  // "this" keyword containt user data which execute this method
  const user = this;

  return user.firstName + ' ' + user.lastName;
};

userSchema.statics.findByCredentials = async (email, password) => {
  // Checking if email is valid
  if (!validator.isEmail(email)) {
    throw { message: "Email is invalid", data: "email" };
  }
  //Finding user by his email
  const user = await User.findOne({ email });
  if (!user) {
    throw { message: "There is no user registered on this email", data: "email" };
  }
  //Checking for correct password
  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    throw { message: "Incorect password", data: "password" };
  }

  //If all good send back user
  return user;
};

userSchema.statics.validateRegister = async (data) => {
  const { firstName, lastName, email, password, passwordConf } = data;
  const isTaken = await User.findOne({ email: email });
  if (firstName.length <= 0) throw { message: "This field can't be empty", data: "firstName" };
  if (lastName.length <= 0) throw { message: "This field can't be empty", data: "lastName" };
  if (email.length <= 0) throw { message: "This field can't be empty", data: "email" };
  if (!validator.isEmail(email)) throw { message: "Invalid email", data: "email" };
  if (isTaken) throw { message: "Email is already taken", data: "email" };
  if (password.length < 8) throw { message: "Password doesn't meet requirements", data: "password" };
  if (password !== passwordConf) throw { message: "Passwords don't match", data: "passwordConf" };
  delete data.passwordConf;

  console.log(chalk.green('Register data validation TRUE'))

  return data;
};

// userSchema.statics.validateLogin = async (data) => {
//     const {email,password} = data
//     const user = await User.findOne({email:email})
//     if(!user) throw {message: 'There is no user registered on this email',data:'email'}
//     if(user.password !== password) throw {message: 'Incorect password',data:'password'}  
// }   


const User = mongoose.model('User',userSchema)

module.exports = User