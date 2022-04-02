const express = require("express");
const CheckoutRouter = express.Router();

const {
  createCheckout,
  getSavedItem,
} = require("../../Controllers/User/Checkout.js");
const userLoggedIn = require("../../Middlewares/User/userLoggedIn.js");
CheckoutRouter.route("/create-checkout").post(userLoggedIn, createCheckout);
CheckoutRouter.route("/get-saved-item").get(userLoggedIn, getSavedItem);

const object = { CheckoutRouter };
module.exports = object;
