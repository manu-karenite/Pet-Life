const express = require("express");
const AuthUserRouter = express.Router();

const {
  registerUser,
  registerUserConfirm,
  loginUser,
  verifyUser,
} = require("../../Controllers/User/Authentication.js");

AuthUserRouter.route("/register-user").post(registerUser);
AuthUserRouter.route("/register-user/confirm").post(
  registerUserConfirm
);
AuthUserRouter.route("/login").post(loginUser);
AuthUserRouter.route("/verify-user").get(verifyUser);
const object = { AuthUserRouter };
module.exports = object;
