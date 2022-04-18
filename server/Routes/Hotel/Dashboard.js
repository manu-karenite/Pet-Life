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
  deleteImage,
  updatePets,
  getPets,
  createService,
  getServices,
  deleteService,
  getHotelBook,
  acceptRejectBooking,
  changeState,
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
dashboardRouter.route("/hotel/delete-image").delete(hotelLoggedIn, deleteImage);

//for services section
dashboardRouter.route("/hotel/update-pets").post(hotelLoggedIn, updatePets);
dashboardRouter.route("/hotel/get-pets").get(hotelLoggedIn, getPets);
dashboardRouter
  .route("/hotel/create-service")
  .post(hotelLoggedIn, createService);
dashboardRouter.route("/hotel/get-services").get(hotelLoggedIn, getServices);
dashboardRouter
  .route("/hotel/delete-service/:id")
  .delete(hotelLoggedIn, deleteService);

//for services section
dashboardRouter
  .route("/hotel/get-hotel-bookings/:id")
  .get(hotelLoggedIn, getHotelBook);
dashboardRouter
  .route("/hotel/accept-reject-booking")
  .post(hotelLoggedIn, acceptRejectBooking);
dashboardRouter.route("/hotel/change-state").post(hotelLoggedIn, changeState);
const obj = { dashboardRouter };

module.exports = obj;
