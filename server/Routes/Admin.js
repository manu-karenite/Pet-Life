const express = require("express");
const AdminRouter = express.Router();

const { loginAdmin, verifyJWT } = require("../Controllers/Admin.js");

AdminRouter.route("/admin/login").post(loginAdmin);
AdminRouter.route("/admin/verify-jwt").post(verifyJWT);
const object = { AdminRouter };
module.exports = object;
