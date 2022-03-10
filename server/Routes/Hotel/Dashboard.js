const express = require("express");
const dashboardRouter = express.Router();

const hotelLoggedIn = require("../../Middlewares/Hotel/hotelLoggedIn.js");
const {
  createCoupon,
  getCoupons,
  deleteCoupon,
  getProfile,
  updateProfile,
} = require("../../Controllers/Hotel/Dashboard.js");
dashboardRouter.route("/hotel/create-coupon").post(hotelLoggedIn, createCoupon);
dashboardRouter.route("/hotel/coupons").get(hotelLoggedIn, getCoupons);
dashboardRouter
  .route("/hotel/coupon/delete")
  .delete(hotelLoggedIn, deleteCoupon);

//for profile of hotel
dashboardRouter.route("/hotel/profile").get(hotelLoggedIn, getProfile);
dashboardRouter
  .route("/hotel/update-profile")
  .patch(hotelLoggedIn, updateProfile);
const obj = { dashboardRouter };
module.exports = obj;
