const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ReviewSchema = new Schema(
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
    star: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const reviews = mongoose.model("reviews", ReviewSchema);
module.exports = reviews;
