const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A user Must Have a Name"],
    },
    email: {
        type: String, 
        required: [true, "A user must have an email address for communication purpose"],
        unqiue: true,
    },
    password: {
        type: String,
    },
    otp: {
        type: "String",
    },
    otpValidUpto: Date,

    petname: {
        type: String,
      },
      address: {
        data1: String,
        data2: String,
        city: String,
        state: String,
        PIN: {
          type: String,
          minlength: 6,
          maxlength: 6,
        },
      },
      contact: {
        type: String,
        minLength: 10,
        maxlength: 10,
        unqiue: true,
      },
      petage: {
        type: String,
        minLength: 1,
        maxlength: 2,
      },
      allergy: {
        type: String,
      },
      food: {
        type: String,
      },
      category: {
        type: String,
      },
});

//creating a model for users
const users = mongoose.model("users", usersSchema);
module.exports = users;
