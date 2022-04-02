const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const checkoutSchema = new Schema(
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
    couponApplied: {
      type: Boolean,
      default: false,
    },
    coupon: {
      type: String,
      default: "",
    },
    discountAvailed: {
      type: Number,
      default: 0,
    },
    slot: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

const checkout = mongoose.model("Checkout", checkoutSchema);
module.exports = checkout;
