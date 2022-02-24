const express = require("express");
const AuthHotelRouter = express.Router();

const {
  registerHotel,
  registerHotelConfirm,
  loginHotel,
  verifyHotel,
} = require("../../Controllers/Hotel/Authentication.js");

AuthHotelRouter.route("/hotel/register-hotel").post(registerHotel);
AuthHotelRouter.route("/hotel/register-hotel/confirm").post(
  registerHotelConfirm
);
AuthHotelRouter.route("/hotel/login").post(loginHotel);
AuthHotelRouter.route("/hotel/verify-hotel").get(verifyHotel);
const object = { AuthHotelRouter };
module.exports = object;
