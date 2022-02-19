const express = require("express");
const AuthHotelRouter = express.Router();

const {
  registerHotel,
  registerHotelConfirm,
} = require("../../Controllers/Hotel/Authentication.js");

AuthHotelRouter.route("/hotel/register-hotel").post(registerHotel);
AuthHotelRouter.route("/hotel/register-hotel/confirm").post(
  registerHotelConfirm
);
const object = { AuthHotelRouter };
module.exports = object;
