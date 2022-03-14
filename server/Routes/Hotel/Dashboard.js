const express = require("express");
const dashboardRouter = express.Router();

const hotelLoggedIn = require("../../Middlewares/Hotel/hotelLoggedIn.js");
const {
  createCoupon,
  getCoupons,
  deleteCoupon,
  getProfile,
  updateProfile,
  responseAddImage,
  getImages,
} = require("../../Controllers/Hotel/Dashboard.js");

const {
  uploadImages,
  destroyImage,
} = require("../../Utitlities/Cloudinary/cloudinary.js");
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

//for images section
dashboardRouter
  .route("/hotel/add-image")
  .post(hotelLoggedIn, uploadImages, responseAddImage);
dashboardRouter.route("/hotel/get-images").get(hotelLoggedIn, getImages);
const obj = { dashboardRouter };
module.exports = obj;
