const Checkout = require("../../Models/Checkout.js");
const users = require("../../Models/Users.js");
const hotel = require("../../Models/Hotel.js");
const createCheckout = async (req, res) => {
  const { user, hotel, serviceId } = req.body;
  try {
    if (!user) throw "User Id Not Found";
    if (!hotel) throw "Hotel Id Not Found";
    if (!serviceId) throw "Hotel Service Not Chosen";
    //we are here, it means everything is existing and
    //remove if any previous exists...data
    const deleted = await Checkout.findOneAndDelete({ user: user });
    let newQuery = new Checkout({
      user,
      hotel,
      serviceId,
    });
    newQuery = await newQuery.save();
    console.log(newQuery);
    res.status(201).json("Okay");
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
const getSavedItem = async (req, res) => {
  // get the id from req object;
  try {
    const savedItem = await Checkout.findOne({ user: req._id })
      .populate({
        path: "user",
        users,
      })
      .populate({ path: "hotel", hotel });
    res.status(200).json(savedItem);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
const obj = { createCheckout, getSavedItem };
module.exports = obj;
