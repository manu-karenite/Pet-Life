const express = require("express");
const UserdashboardRouter = express.Router();
const userLoggedIn = require("../../Middlewares/User/userLoggedIn.js");
const { updateUserProfile, getUserProfile} = require("../../Controllers/User/Dashboard.js"); 

//for profile of users
UserdashboardRouter.route("/profile").get(userLoggedIn, getUserProfile);
UserdashboardRouter.route("/update-profile").patch( updateUserProfile);
const obj = { UserdashboardRouter };
module.exports = obj;
