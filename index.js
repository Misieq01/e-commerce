const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const chalk = require('chalk')
require("dotenv").config();

const app = express();
app.use(cors());

const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require("./routes/user"));


const db = require('./config/keys').mongoURI;
mongoose
.connect(db, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: false,
  useFindAndModify: false,
})
.then(() => console.log(chalk.greenBright("Database Connected")))
.catch((err) => console.log(chalk.redBright("Database error: " + err)));

// console.log("dataase: " + db)
// console.log("port: " + port)
// console.log('baseURL: ' + process.env.BASE_URL)


app.use(express.static(path.join(__dirname, "/client/build")));
//
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});

app.listen(port, () => {
  console.log(chalk.greenBright("Server is online"));
});