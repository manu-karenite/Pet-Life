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
  contactUs,
  changePasswordCreateOTP,
  changePasswordVerifyOTP,
  changePasswordSetPassword,
  deleteProfile,
} = require("../../Controllers/User/Authentication.js");

const userLoggedIn = require("../../Middlewares/User/userLoggedIn.js");
AuthUserRouter.route("/register-user").post(registerUser);
AuthUserRouter.route("/register-user/confirm").post(registerUserConfirm);
AuthUserRouter.route("/login").post(loginUser);
AuthUserRouter.route("/verify-user").get(verifyUser);
AuthUserRouter.route("/forgot-password").post(forgotPassword);
AuthUserRouter.route("/verify-otp").post(verifyOTP);
AuthUserRouter.route("/update-password").patch(updatePassword);

//for updating password now.....
AuthUserRouter.route("/change-password/create-otp").post(
  userLoggedIn,
  changePasswordCreateOTP
);
AuthUserRouter.route("/change-password/verify-otp").post(
  userLoggedIn,
  changePasswordVerifyOTP
);
AuthUserRouter.route("/change-password/set-password").patch(
  userLoggedIn,
  changePasswordSetPassword
);
//to Contact the Admin
AuthUserRouter.route("/contact-us").post(contactUs);

AuthUserRouter.route("/delete-profile/:id").delete(userLoggedIn, deleteProfile);
const object = { AuthUserRouter };
module.exports = object;
