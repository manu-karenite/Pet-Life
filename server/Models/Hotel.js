const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A Hotel Must Have a Name"],
  },
  address: {
    data1: String,
    data2: String,
    city: String,
    state: String,
    PIN: {
      type: Number,
      minlength: 6,
      maxlength: 6,
    },
    landmark: String,
  },
  contact: {
    type: Number,
    minLength: 10,
    maxlength: 10,
    unqiue: true,
  },
  email: {
    type: String,
    required: [true, "A Hotel must have an email address for business emails"],
    unqiue: true,
  },
  password: {
    type: String,
  },
  starRating: {
    type: Number,
    default: 0,
  },
  numberOfRatings: {
    type: Number,
    default: 0,
  },
  description: String,
  shortDescription: String,
  petsAllowed: [String],
  services: [
    {
      serviceTime: String,
      servicePrice: Number,
      serviceNote: String,
      servicePet: String,
      servicesList: [String],
    },
  ],
  coupons: [
    {
      name: String,
      discount: String, //percentage here,
      validFrom: Date,
      validUpto: Date,
      minimumCartAmount: String,
      maxDiscount: String,
    },
  ],
  images: [
    {
      public_id: String,
      secure_url: String,
    },
  ],
  status: {
    type: String,
    enum: ["Active", "In-Active", "Queued"],
    default: "In-Active",
  },
  otp: {
    type: "String",
  },
  otpValidUpto: Date,
});

//creating a model for hotel
const hotel = mongoose.model("hotel", hotelSchema);
module.exports = hotel;
