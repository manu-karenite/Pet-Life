const express = require("express");
const DashboardRouter = express.Router();

const {
  getHotels,
  getIndividualHotel,
  getMoreHotelDetails,
  updatePetDetails,
  getPetDetails,
} = require("../../Controllers/User/Dahsboard.js");
const userLoggedIn = require("../../Middlewares/User/userLoggedIn.js");
DashboardRouter.route("/get-hotels").get(getHotels);
DashboardRouter.route("/get-hotel-detail/:hotelId").get(getIndividualHotel);
DashboardRouter.route("/get-more-hotel-details/:hotelId").get(
  getMoreHotelDetails
);

DashboardRouter.route("/update-pet").post(userLoggedIn, updatePetDetails);
DashboardRouter.route("/get-my-pet").get(userLoggedIn, getPetDetails);
const object = { DashboardRouter };
module.exports = object;
