const express = require("express");
const AuthHotelRouter = express.Router();

const {
  registerHotel,
  registerHotelConfirm,
  loginHotel,
  verifyHotel,
  forgotPassword,
  verifyOTP,
  updatePassword,
} = require("../../Controllers/Hotel/Authentication.js");

AuthHotelRouter.route("/hotel/register-hotel").post(registerHotel);
AuthHotelRouter.route("/hotel/register-hotel/confirm").post(
  registerHotelConfirm
);
AuthHotelRouter.route("/hotel/login").post(loginHotel);
AuthHotelRouter.route("/hotel/verify-hotel").get(verifyHotel);
AuthHotelRouter.route("/hotel/forgot-password").post(forgotPassword);
AuthHotelRouter.route("/hotel/verify-otp").post(verifyOTP);
AuthHotelRouter.route("/hotel/update-password").patch(updatePassword);
const object = { AuthHotelRouter };
module.exports = object;
