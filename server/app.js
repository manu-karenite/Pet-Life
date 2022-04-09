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
//for hotels routes
const { AuthHotelRouter } = require("./Routes/Hotel/Authentication.js");
const { dashboardRouter } = require("./Routes/Hotel/Dashboard.js");
//for user routes
const { AuthUserRouter } = require("./Routes/User/Userauth.js");
const { DashboardRouter } = require("./Routes/User/Dashboard.js");
const { CheckoutRouter } = require("./Routes/User/Checkout.js");
console.log(process.env.ADMIN_MAIL);
console.log(process.env.ADMIN_PASSWORD);

//for admin only  routes
const { AdminRouter } = require("./Routes/Admin.js");
//hotel Middlewares
app.use("/api/v1", AuthUserRouter);
app.use("/api/v1", dashboardRouter);
//user middlewares
app.use("/api/v1", AuthHotelRouter);
app.use("/api/v1", DashboardRouter);
app.use("/api/v1", CheckoutRouter);
//admin middlewares
app.use("/api/v1", AdminRouter);

module.exports = app;
