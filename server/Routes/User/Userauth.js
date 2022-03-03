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
} = require("../../Controllers/User/Authentication.js");

AuthUserRouter.route("/register-user").post(registerUser);
AuthUserRouter.route("/register-user/confirm").post(
  registerUserConfirm
);
AuthUserRouter.route("/login").post(loginUser);
AuthUserRouter.route("/verify-user").get(verifyUser);
AuthUserRouter.route("/forgot-password").post(forgotPassword);
AuthUserRouter.route("/verify-otp").post(verifyOTP);
AuthUserRouter.route("/update-password").patch(updatePassword);
const object = { AuthUserRouter };
module.exports = object;
