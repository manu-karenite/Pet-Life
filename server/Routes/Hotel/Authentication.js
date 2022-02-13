const express = require("express");
const AuthHotelRouter = express.Router();

const { registerHotel } = require("../../Controllers/Hotel/Authentication.js");

AuthHotelRouter.route("/hotel/register-hotel").post(registerHotel);

const object = { AuthHotelRouter };
module.exports = object;
