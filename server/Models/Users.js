const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A users Must Have a Name"],
    },
    email: {
        type: String,
        required: [true, "A users must have an email address for business emails"],
        unqiue: true,
    },
    password: {
        type: String,
    },
    otp: {
        type: "String",
    },
    otpValidUpto: Date,
});

//creating a model for users
const users = mongoose.model("users", usersSchema);
module.exports = users;
