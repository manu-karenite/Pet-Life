const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

//creating an express application :
const app = express();
//requiring ENV variables
require("dotenv").config();
//initialsing body to handle JSON Type Data
app.use(bodyParser.json({ limit: "2mb" }));
//using Cross Origin Resource Sharing so that, our front end at localhost:3000 can communicate with backend at local host:8000
app.use(cors());

module.exports = app;
