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
      type: "Number",
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
    type: "Number",
  },
  numberOfRatings: Number,
  description: String,
  shortDescription: String,
  petsAllowed: [String],
  services: [
    {
      serviceName: String,
      serviceCharge: Number,
      description: String,
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
  images: {
    type: [String],
  },
  status: {
    type: String,
    enum: ["Active", "In-Active", "Queued"],
    default: "In-Active",
  },
});

//creating a model for hotel
const hotel = mongoose.model("hotel", hotelSchema);
module.exports = hotel;
