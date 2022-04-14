//importing models
var shuffle = require("shuffle-array");
const Hotel = require("../../Models/Hotel.js");
const pets = require("../../Models/Pets.js");
const Booking = require("../../Models/Booking.js");
const reviews = require("../../Models/Review.js");
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
const createMyPet = async (req, res) => {
  const { name, age, mark, all1, all2, all3, category } = req.body;

  try {
    //get for pets details........
    //check the name against regexp pattern
    const re = new RegExp("^[a-zA-Z ]+$");
    //only letters are sllowed with spaces...
    const resultOfMatch = name.match(re);
    if (!resultOfMatch) {
      throw "Please Enter Pet's Name with Letters and Spaces";
    }
    let query = new pets({
      user: req._id,

      nickname: req.body.name,
      age: req.body.age,
      identificationMark: mark,
      allergy1: all1,
      allergy2: all2,
      allergy3: all3,
      category: category,
    });
    query = await query.save();
    console.log(query);
    res.status(201).json("Okay");
  } catch (error) {
    res.status(400).json(error);
  }
};
const deleteMyPet = async (req, res) => {
  console.log(req.params);
  try {
    const result = await pets.findByIdAndDelete(req.params?.petId);
    res.status(200).json("Deleted");
  } catch (error) {
    res.status(400).json(error);
  }
};
const getPetDetails = async (req, res) => {
  try {
    const pet = await pets.find({ user: req._id });
    console.log("MY PETS");
    console.log(pet);
    return res.status(200).json(pet);
  } catch (error) {
    res.status(400).json(error);
  }
};
const addReview = async (req, res) => {
  console.log(req.body);
  //just check booking table, if the user has already booked a hotel or not,
  //so if user has booked, then he is eligible for review otheriwse not.....
  try {
    const userBooked = await Booking.findOne({
      user: req.body.user,
      hotel: req.body.hotelId,
    });
    if (!userBooked) {
      throw "Please Complete a Booking to Review the Hotel";
    }

    //okay, so now we can just add a review.....
    //1)if user has already made a review, just update it, else add a new one......
    const reviewExisting = await reviews.findOne({
      user: req.body.user,
      hotel: req.body.hotelId,
    });
    if (reviewExisting) {
      //update here
      const getHotel = await Hotel.findOne({ _id: req.body.hotelId });
      const PreviousRating = getHotel?.starRating;
      const updatedReview = await reviews.findOneAndUpdate(
        { user: req.body.user, hotel: req.body.hotelId },
        { star: req.body.star, comment: req.body.review },
        { new: true }
      );
      await Hotel.findOneAndUpdate(
        { _id: getHotel?._id },
        {
          starRating:
            (getHotel?.starRating * getHotel?.numberOfRatings -
              PreviousRating +
              req.body.star) /
            getHotel?.numberOfRatings,
        }
      );
    } else {
      //create a new one....
      let query = new reviews({
        hotel: req.body.hotelId,
        user: req.body.user,
        star: req.body.star,
        comment: req.body.review,
      });
      query = await query.save();
      console.log(query);
      //So, here we are sure, that our review has been stored accoridngly, just update the hotel by, having the avg reviews and number of reviews added.....
      const getHotel = await Hotel.findOne({ _id: req.body.hotelId });
      const hotelRating = getHotel?.starRating ? getHotel?.starRating : 0;
      const numberOfRatings = getHotel?.numberOfRatings
        ? getHotel?.numberOfRatings
        : 0;
      console.log(hotelRating, numberOfRatings);
      if (numberOfRatings === 0) {
        //it is the first rw
        await Hotel.findOneAndUpdate(
          { _id: getHotel._id },
          { starRating: req.body.star, numberOfRatings: 1 }
        );
      } else {
        //we have to add a review and increment it.....

        await Hotel.findOneAndUpdate(
          { _id: getHotel._id },
          {
            starRating:
              (hotelRating * numberOfRatings + req.body.star) /
              (numberOfRatings + 1),
            numberOfRatings: numberOfRatings + 1,
          }
        );
      }
    }
    res.status(200).json("Okay");
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
const getReviewsHotelWise = async (req, res) => {
  console.log(req.params);
  try {
    const result = await reviews
      .find({ hotel: req.params.hotelId })
      .populate("user");
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};
const getUserBookings = async (req, res) => {
  console.log("GET BOOKINGS FROM USER");
  try {
    const result = await Booking.find({ user: String(req._id) })
      .populate("hotel")
      .sort({ createdAt: "-1" });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
const object = {
  getHotels,
  getIndividualHotel,
  getMoreHotelDetails,
  updatePetDetails,
  createMyPet,
  deleteMyPet,
  getPetDetails,
  addReview,
  getReviewsHotelWise,
  getUserBookings,
};
module.exports = object;
