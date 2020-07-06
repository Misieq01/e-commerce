const mongoose = require('mongoose');
const chalk = require('chalk')

const userSchema = mongoose.Schema({
    firstName: {type: String,required: true,trim: true},
    lastName: {type: String,required: true,trim: true},
    email: {type: String, required: true,unique: true,trim: true},
    password: {type: String, required: true,trim: true},
    tokens: [
        {token: {type:String}}
    ]

})


// This method apply to every request of getting user data
// Becasue toJSON is called with every data request
userSchema.methods.toJSON = function () {
  // "this" keyword containt user data which execute this method
  const user = this;

  // Return pure user data object (like the userSchema) with data of passed user
  // So in otherwords it cuts all properties and methods added to this object by database
  // And leave only ones that are declared in userSchema (firstName,lastName,email,etc.)
  const userObject = user.toObject();

  // Deleting fields that should be hidden
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

// Simple method to return full name of user
userSchema.methods.getFullName = function () {
  // "this" keyword containt user data which execute this method
  const user = this;

  return user.firstName + ' ' + user.lastName;
};

userSchema.methods.generateAuthToken = async function () {
  // "this" keyword containt user data which execute this method
  const user = this;

  // Creating user session token based on user id with the help of json web token library
  const token = jwt.sign({ _id: user._id.toString() }, "venividivici");

  //Adding token to user data to allow him to access his account
  //And all routes that require authentication
  user.tokens = user.tokens.concat({ token });

  //Saving updated data
  await user.save();

  return token;
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

//This method fires each time user document is saved
userSchema.pre("save", async function (next) {
  // "this" keyword containt user data which execute this method
  const user = this;

  // Checking for password update
  // Simply this is true when creating account or changing password
  if (user.isModified("password")) {
    //Hashing user password for security reason
    user.password = await bcryptjs.hash(user.password, 8);
  }

  //It's working like middleware so we need to tell program to move on
  next();
});

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

userSchema.statics.validateLogin = async (data) => {
    const {email,password} = data
    const user = await User.findOne({email:email})
    if(user) throw {message: 'There is no user registered on this email',data:'email'}
    if(user.password !== password) throw {message: 'Incorect password',data:'password'}  
}   


const User = mongoose.model('User',userSchema)

module.exports = User