const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

module.exports = exports = function (schema) {
  schema.methods.generateAuthToken = async function () {
    // "this" keyword containt user data which execute this method

    // Creating user session token based on user id with the help of json web token library
    const token = jwt.sign({ _id: this._id.toString() }, "venividivici");

    //Adding token to user data to allow him to access his account
    //And all routes that require authentication
    this.tokens = this.tokens.concat({ token });

    //Saving updated data
    await this.save();

    return token;
  };

  //This method fires each time user document is saved
  schema.pre("save", async function (next) {
    // "this" keyword containt user data which execute this method

    // Checking for password update
    // Simply this is true when creating account or changing password
    if (this.isModified("password")) {
      //Hashing user password for security reason
      this.password = await bcryptjs.hash(this.password, 8);
    }

    //It's working like middleware so we need to tell program to move on
    next();
  });

  // This method apply to every request of getting user data
  // Becasue toJSON is called with every data request
  schema.methods.toJSON = function () {
    // "this" keyword containt user data which execute this method

    // Return pure user data object (like the userSchema) with data of passed user
    // So in otherwords it cuts all properties and methods added to this object by database
    // And leave only ones that are declared in userSchema (firstName,lastName,email,etc.)
    const userObject = this.toObject();

    // Deleting fields that should be hidden
    delete userObject.password;
    delete userObject.tokens;

    return userObject;
  };
};
