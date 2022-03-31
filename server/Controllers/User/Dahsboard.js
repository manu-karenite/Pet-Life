//importing models
const Hotel = require("../../Models/Hotel.js");

const getHotels = async (req, res) => {
  console.log("HERE ALL HOTELS LIES");
  try {
    const allHotels = await Hotel.find({});
    return res.status(200).json(allHotels);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
const object = { getHotels };
module.exports = object;
