const express = require("express");
const DashboardRouter = express.Router();

const {
  getHotels,
  getIndividualHotel,
  getMoreHotelDetails,
  updatePetDetails,
  createMyPet,
  deleteMyPet,
  getPetDetails,
  addReview,
  getReviewsHotelWise,
  getUserBookings,
} = require("../../Controllers/User/Dahsboard.js");
const userLoggedIn = require("../../Middlewares/User/userLoggedIn.js");
DashboardRouter.route("/get-hotels").get(getHotels);
DashboardRouter.route("/get-hotel-detail/:hotelId").get(getIndividualHotel);
DashboardRouter.route("/get-more-hotel-details/:hotelId").get(
  getMoreHotelDetails
);

DashboardRouter.route("/create-my-pet").post(userLoggedIn, createMyPet);
DashboardRouter.route("/get-my-pet").get(userLoggedIn, getPetDetails);
DashboardRouter.route("/delete-my-pet/:petId").delete(
  userLoggedIn,
  deleteMyPet
);

DashboardRouter.route("/add-review").post(userLoggedIn, addReview);
DashboardRouter.route("/get-all-reviews/:hotelId").get(getReviewsHotelWise);

DashboardRouter.route("/get-user-bookings").get(userLoggedIn, getUserBookings);

const object = { DashboardRouter };
module.exports = object;
