//importing models
var shuffle = require("shuffle-array");
const Hotel = require("../../Models/Hotel.js");
const pets = require("../../Models/Pets.js");
const getHotels = async (req, res) => {
  try {
    const allHotels = await Hotel.find({});
    return res.status(200).json(allHotels);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
const getIndividualHotel = async (req, res) => {
  const { hotelId } = req.params;
  console.log(hotelId);
  try {
    const hotel = await Hotel.findOne({ _id: hotelId });
    if (!hotel) {
      throw "No Hotel Found";
    }
    return res.status(200).json(hotel);
  } catch (error) {
    res.status(490).json(error);
  }
};
const getMoreHotelDetails = async (req, res) => {
  console.log(req.params);
  const _id = req.params.hotelId;
  try {
    //get all the hotels from db
    let allHotels = await Hotel.find({});
    //shuffle the array to randomise result of explore more...
    shuffle(allHotels);
    //since we have to send three only in more items, just get first 4, and remove current if necessary and then send ONLY THREE;
    let toSendArray = allHotels.filter((Curr, index) => {
      return String(Curr?._id) != String(_id);
    });
    toSendArray = toSendArray.slice(0, 3);
    res.status(200).json(toSendArray);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
const updatePetDetails = async (req, res) => {
  console.log(req.body);
  const { name, age, mark, all1, all2, all3, category } = req.body;
  try {
    const userExists = await pets.findOne({ user: req._id });
    if (!userExists) {
      //just create a new and update....
      let query = new pets({
        user: req._id,
        nickname: name,
        age: age,
        identificationMark: mark,
        allergy1: all1,
        allergy2: all2,
        allergy3: all3,
        category: category,
      });
      query = await query.save();
      console.log(query);
    } else {
      let query = await pets.findOneAndUpdate(
        { user: req._id },
        {
          nickname: name,
          age: age,
          identificationMark: mark,
          allergy1: all1,
          allergy2: all2,
          allergy3: all3,
          category: category,
        },
        { new: true }
      );
      console.log(query);
    }
    return res.status(200).json("Okay");
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
const getPetDetails = async (req, res) => {
  try {
    const pet = await pets.findOne({ user: req._id });
    return res.status(200).json(pet);
  } catch (error) {
    res.status(400).json(error);
  }
};

const object = {
  getHotels,
  getIndividualHotel,
  getMoreHotelDetails,
  updatePetDetails,
  getPetDetails,
};
module.exports = object;
