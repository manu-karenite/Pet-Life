const express = require("express");
const DashboardRouter = express.Router();

const {
  getHotels,
  getIndividualHotel,
  getMoreHotelDetails,
  updatePetDetails,
  getPetDetails,
  addReview,
  getReviewsHotelWise,
} = require("../../Controllers/User/Dahsboard.js");
const userLoggedIn = require("../../Middlewares/User/userLoggedIn.js");
DashboardRouter.route("/get-hotels").get(getHotels);
DashboardRouter.route("/get-hotel-detail/:hotelId").get(getIndividualHotel);
DashboardRouter.route("/get-more-hotel-details/:hotelId").get(
  getMoreHotelDetails
);

DashboardRouter.route("/update-pet").post(userLoggedIn, updatePetDetails);
DashboardRouter.route("/get-my-pet").get(userLoggedIn, getPetDetails);

DashboardRouter.route("/add-review").post(userLoggedIn, addReview);
DashboardRouter.route("/get-all-reviews/:hotelId").get(getReviewsHotelWise);
const object = { DashboardRouter };
module.exports = object;
