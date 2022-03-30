const mongoose = require("mongoose");

const bookingsSchema = new mongoose.Schema({
    checkin: {
        type: Date,
        default: Date.now,
        required: [true],
    },
    checkout: {
        type: Date,
        default: Date.now,
        required: [true],
    },
    noOfPets: {
        type: Number,
        required: [true],
    },
    serviceReq: {
        type: String,
        required: [true],
    },
    coupons: {
        type: String,
        required: [true],
    },
    total: {
        type: Number,
        required: [true],
    },
});

//creating a model for bookings
const bookings = mongoose.model("bookings", bookingsSchema);
module.exports = bookings;
