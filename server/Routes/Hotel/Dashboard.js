const express = require("express");
const dashboardRouter = express.Router();

const hotelLoggedIn = require("../../Middlewares/Hotel/hotelLoggedIn.js");
const {
  createCoupon,
  getCoupons,
  deleteCoupon,
} = require("../../Controllers/Hotel/Dashboard.js");
dashboardRouter.route("/hotel/create-coupon").post(hotelLoggedIn, createCoupon);
dashboardRouter.route("/hotel/coupons").get(hotelLoggedIn, getCoupons);
dashboardRouter
  .route("/hotel/coupon/delete")
  .delete(hotelLoggedIn, deleteCoupon);
const obj = { dashboardRouter };
module.exports = obj;
