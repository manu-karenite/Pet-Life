const express = require("express");
const DashboardRouter = express.Router();

const { getHotels } = require("../../Controllers/User/Dahsboard.js");

DashboardRouter.route("/get-hotels").get(getHotels);

const object = { DashboardRouter };
module.exports = object;
