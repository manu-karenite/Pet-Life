const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PetSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    identificationMark: {
      type: String,
      required: true,
    },
    allergy1: {
      type: String,
      default: "",
    },
    allergy2: {
      type: String,
      default: "",
    },
    allergy3: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const pets = mongoose.model("pets", PetSchema);
module.exports = pets;
