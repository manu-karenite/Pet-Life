const hotel = require("../../Models/Hotel.js");
const transporter = require("../../Utitlities/Mailers/transporter.js");
const registrationTemplate = require("../../Utitlities/Templates/Hotel/Registration.js");
const signToken = require("../../Utitlities/JWTHandlers/signToken.js");
const registerHotel = async (req, res) => {
  let { name, email, contact, owner } = req.body;
  try {
    if (!name || !email || !contact || !owner) {
      throw "Insufficient Details Found! Please Fill in the details Carefully";
    }

    //query the DB for any email present or not!
    const checkEmail = await hotel.findOne({ email });
    if (checkEmail) {
      throw "Hotel Already Registered with Email Address! Please Login to Continue!";
    }
    //lets check whether email is going or not already
    let shallowCopy = registrationTemplate;
    //create template according to you
    shallowCopy = shallowCopy.replace("FullName", owner);
    shallowCopy = shallowCopy.replace("HOTELNAME", name);
    const jwt = await signToken("email", email);
    shallowCopy = shallowCopy.replace(
      "REDIRECT_EMAIL",
      `${process.env.FRONTEND_URL}/hotel/register/confirm/${jwt}`
    );
    const result = await transporter(
      email,
      "Hotels Onboarding @ Pet Life",
      shallowCopy
    );
    res.status(200).json("ok");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const object = { registerHotel };
module.exports = object;
