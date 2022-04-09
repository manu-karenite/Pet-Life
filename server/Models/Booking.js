const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bookingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    hotel: {
      type: Schema.Types.ObjectId,
      ref: "hotel",
      required: true,
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: "hotel.services",
      required: true,
    },
    couponDiscount: {
      type: Number,
      default: 0,
    },
    coupon: {
      type: String,
      default: "",
    },
    time: {
      type: Date,
      required: true,
    },
    baseCharge: {
      type: Number,
      required: true,
    },
    taxes: {
      type: Number,
      required: true,
    },
    charge: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    pet: {
      type: Schema.Types.ObjectId,
      ref: "pets",
      required: true,
    },
    paymentMode: {
      type: String,
      required: true,
    },
    bookingId: {
      type: String,
      required: true,
    },
    billingDetails: {
      billingEmail: String,
      billingName: String,
      billingContact: String,
      billingAddress1: String,
      billingAddress2: String,
      billingPin: String,
      billingCity: String,
      billingState: String,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

const booking = mongoose.model("Booking", bookingSchema);
module.exports = booking;
