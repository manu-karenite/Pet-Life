const express = require("express");
const AdminRouter = express.Router();

const {
  loginAdmin,
  verifyJWT,
  getAllPets,
  getPetById,
  getAllUsers,
  changeStatus,
  getAllHotels,
  getHotelById,
  getAllBookings,
  deleteService,
  getBookingById,
} = require("../Controllers/Admin.js");
const { adminLoggedIn } = require("../Middlewares/adminLoggedIn.js");
AdminRouter.route("/admin/login").post(loginAdmin);
AdminRouter.route("/admin/verify-jwt").post(verifyJWT);

//for pets in Admin Panel....
AdminRouter.route("/admin/get-all-pets").get(getAllPets);
AdminRouter.route("/admin/get-pet/:id").get(getPetById);

//for users in Admin Panel....
AdminRouter.route("/admin/get-all-users").get(getAllUsers);

//for hotels in Admin Panel
AdminRouter.route("/admin/change-status/:hotelId").patch(changeStatus);
AdminRouter.route("/admin/delete-service/:hotelId/:serviceId").delete(
  deleteService
);
AdminRouter.route("/admin/get-all-hotels").get(getAllHotels);
AdminRouter.route("/admin/get-hotel/:id").get(getHotelById);

//for bookings in Admin Panel....
AdminRouter.route("/admin/get-all-bookings").get(getAllBookings);
AdminRouter.route("/admin/get-booking/:bookingId").get(getBookingById);
const object = { AdminRouter };
module.exports = object;
