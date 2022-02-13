const hotel = require("../../Models/Hotel.js");
const registerHotel = async (req, res) => {
  let { name, email, contact, owner } = req.body;
  try {
    if (!name || !email || !contact || !owner) {
      throw "Insufficient Details Found! Please Fill in the details Carefully";
    }

    //query the DB for any email present or not!
    const checkEmail = await hotel.findOne({ email });
    if (checkEmail) {
      throw "Hotel Already Registered with Email Address! Please try a new One!";
    }
    res.status(200).json("ok");
  } catch (error) {
    return res.status(400).json(error);
  }
};

const object = { registerHotel };
module.exports = object;
