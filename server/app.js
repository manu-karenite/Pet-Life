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
//Using Morgan to display requests :
app.use(morgan("dev"));

//connecting to database .. :
const mongoConnectionString = process.env.MONGO_SRV.replace(
  "<password>",
  process.env.MONGO_PASSWORD
);
mongoose
  .connect(mongoConnectionString)
  .then((res) => console.log("Database is Connected!"))
  .catch((err) => console.log(err));

//Importing Routers :
const { AuthHotelRouter } = require("./Routes/Hotel/Authentication.js");
const { dashboardRouter } = require("./Routes/Hotel/Dashboard.js");
// const adminRouter = require("./Routes/Admin.js");
// app.use("/api/v1", adminRouter);
app.use("/api/v1", AuthHotelRouter);

const { AuthUserRouter } = require("./Routes/User/Userauth.js");
app.use("/api/v1", AuthUserRouter);
app.use("/api/v1", UserdashboardRouter);
app.use("/api/v1", dashboardRouter);
module.exports = app;
