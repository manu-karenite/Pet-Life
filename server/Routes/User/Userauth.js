const express = require("express");
const AuthUserRouter = express.Router();

const {
  registerUser,
  registerUserConfirm,
  loginUser,
  verifyUser,
  forgotPassword,
  verifyOTP,
  updatePassword,
  ProfileUpdatePassword,
  SendMessage,
  FetchHotels, 
  getDetails, 
} = require("../../Controllers/User/Authentication.js");

AuthUserRouter.route("/register-user").post(registerUser);
AuthUserRouter.route("/register-user/confirm").post(registerUserConfirm);
AuthUserRouter.route("/login").post(loginUser);
AuthUserRouter.route("/verify-user").get(verifyUser);
AuthUserRouter.route("/forgot-password").post(forgotPassword);
AuthUserRouter.route("/verify-otp").post(verifyOTP);
AuthUserRouter.route("/update-password").patch(updatePassword);
AuthUserRouter.route("/updatepassword").patch(ProfileUpdatePassword);
AuthUserRouter.route("/contact").post(SendMessage);
AuthUserRouter.route("/menu").post(FetchHotels);
AuthUserRouter.route("/presentation").post(getDetails);
const object = { AuthUserRouter };
module.exports = object;
