const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const pets = require("../Models/Pets.js");
const users = require("../Models/Users.js");
const hotel = require("../Models/Hotel.js");
const Booking = require("../Models/Booking.js");
const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username) {
      throw "No Email Address Found!";
    }
    if (!password) {
      throw "No Password Found!";
    }
    if (username !== process.env.ADMIN_MAIL) throw "Incorrect Email Address";
    if (password !== process.env.ADMIN_PASSWORD) throw "Incorrect Password";

    //IF ALL CORRECT, create a jwt and sign the user in..
    const jwtCreated = await jwt.sign(
      { email: username },
      process.env.JWT_SECRET,
      {
        expiresIn: 2 * 60 * 60,
      }
    );
    res.status(200).json(jwtCreated);
  } catch (err) {
    console.log("FROM LOGIN ADMIN", err);
    res.status(401).json(err);
  }
};
const verifyJWT = async (req, res) => {
  console.log(req.body);
  try {
    const decodedToken = await promisify(jwt.verify)(
      req.body.JWT,
      process.env.JWT_SECRET
    );
    console.log(decodedToken);
    const { email, exp } = decodedToken;
    if (!email) {
      throw "JSON WEB TOKEN Malformed";
    }
    if (email !== process.env.ADMIN_MAIL) {
      throw "Admin Privileges Denied";
    }
    console.log("RETURN OKAY");
    return res.status(200).json("Okay");
  } catch (err) {
    console.log(err);
    res.status(401).json(err);
  }
};

const getAllPets = async (req, res) => {
  try {
    console.log("GET ALL PETS FROM BACKEND");
    const allPets = await pets.find({}).sort({ nickname: 1 });
    let final = [];
    for (let i = 0; i < allPets.length; i++) {
      let curr = allPets[i]._doc;
      curr = { ...curr, key: `${i + 1}` };
      final.push(curr);
    }
    console.log(final);
    res.status(200).json(final);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
const getPetById = async (req, res) => {
  console.log(req.params);
  try {
    const getPet = await pets.findById(req.params.id).populate("user");
    res.status(200).json(getPet);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
const getAllUsers = async (req, res) => {
  try {
    console.log("GET ALL USERS FROM BACKEND");
    const allUsers = await users.find({}).sort({ name: 1 });
    let final = [];
    for (let i = 0; i < allUsers.length; i++) {
      let curr = allUsers[i]._doc;
      curr = { ...curr, key: `${i + 1}` };
      final.push(curr);
    }
    console.log(final);
    res.status(200).json(final);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
const changeStatus = async (req, res) => {
  console.log(req.body);
  console.log(req.params);
  try {
    const updatedHotel = await hotel.findByIdAndUpdate(
      req.params.hotelId,
      { status: req.body.status },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(400).json(error);
  }
};
const getAllHotels = async (req, res) => {
  try {
    const allHotels = await hotel.find({}).sort({ name: 1 });
    let final = [];
    for (let i = 0; i < allHotels.length; i++) {
      let curr = allHotels[i]._doc;
      curr = { ...curr, key: `${i + 1}` };
      final.push(curr);
    }

    res.status(200).json(final);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
const getHotelById = async (req, res) => {
  const id = req.params.id;
  try {
    const all = await hotel.findById(id);
    res.status(200).json(all);
  } catch (error) {
    res.status(40).json(error);
  }
};
const getAllBookings = async (req, res) => {
  try {
    console.log("GET ALL BOOKINGS FROM BACKEND");
    const allBookings = await Booking.find({}).populate("hotel");
    let final = [];
    for (let i = 0; i < allBookings.length; i++) {
      let curr = allBookings[i]._doc;
      curr = { ...curr, key: `${i + 1}` };
      final.push(curr);
    }

    res.status(200).json(final);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
const getBookingById = async (req, res) => {
  console.log(req.params);
  try {
    const getBooking = await Booking.findOne({
      bookingId: req.params.bookingId,
    })
      .populate("user")
      .populate("hotel");
    res.status(200).json(getBooking);
  } catch (err) {
    res.status(400).json(err);
  }
};
const deleteService = async (req, res) => {
  const { hotelId, serviceId } = req.params;
  try {
    //get the hotel services now...curr
    const currHotel = await hotel.findOne({ _id: hotelId });
    //get its services array....

    const servicesExisting = currHotel?.services;

    const newServices = servicesExisting.filter(
      (curr, index) => String(curr?._id) != serviceId
    );
    //update the sevices array with new one...
    const updatedHotel = await hotel.findByIdAndUpdate(
      hotelId,
      { services: newServices },
      { new: true }
    );
    res.status(200).json("Deleted");
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
const obj = {
  loginAdmin,
  verifyJWT,
  getAllPets,
  getPetById,
  getAllUsers,
  changeStatus,
  getAllHotels,
  getHotelById,
  getAllBookings,
  getBookingById,
  deleteService,
};

module.exports = obj;
