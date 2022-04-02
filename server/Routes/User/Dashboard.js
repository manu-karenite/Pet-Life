const express = require("express");
const DashboardRouter = express.Router();

const {
  getHotels,
  getIndividualHotel,
  getMoreHotelDetails,
} = require("../../Controllers/User/Dahsboard.js");

DashboardRouter.route("/get-hotels").get(getHotels);
DashboardRouter.route("/get-hotel-detail/:hotelId").get(getIndividualHotel);
DashboardRouter.route("/get-more-hotel-details/:hotelId").get(
  getMoreHotelDetails
);
const object = { DashboardRouter };
module.exports = object;
