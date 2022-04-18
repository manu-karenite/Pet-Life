const hotel = require("../../Models/Hotel.js");
const Booking = require("../../Models/Booking.js");
const acceptBooking = require("../../Utitlities/Templates/User/AcceptBooking.js");
const rejectBooking = require("../../Utitlities/Templates/User/RejectBooking.js");
const mailer = require("../../Utitlities/Mailers/transporter.js");
const createCoupon = async (req, res) => {
  try {
    //we are here, it means we have a valid hotel authentication
    let query = await hotel.findOne({ email: req.body.email });
    //now we have the id  of the
    const object = {
      name: req.body.name,
      discount: req.body.discount, //percentage here,
      validFrom: new Date(),
      validUpto: new Date(req.body.exp),
      minimumCartAmount: req.body.minimumCart,
      maxDiscount: req.body.maxDiscount,
    };
    query = await hotel.findByIdAndUpdate(
      { _id: query._id },
      { $push: { coupons: object } },
      { new: true }
    );
    return res.status(201).json("OK");
  } catch (error) {
    return res.status(200).json(error);
  }
};
const getCoupons = async (req, res) => {
  try {
    const result = await hotel
      .findOne({ email: req.user })
      .select({ coupons: 1 });
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json(error);
  }
};
const deleteCoupon = async (req, res) => {
  try {
    const couponId = req.query.id;
    const result = await hotel
      .findOne({ email: req.user })
      .select({ coupons: 1, _id: 0 });
    //we get its coupon array
    const updatedArr = result.coupons.filter((curr) => {
      return curr.name !== couponId;
    });
    const updatedHotel = await hotel.findOneAndUpdate(
      { email: req.user },
      { coupons: updatedArr },
      { new: true }
    );

    res.status(200).json("ok");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getProfile = async (req, res) => {
  try {
    console.log(req.user);
    console.log(req.query);
    const hotelExists = await hotel.findOne({ _id: req.query.id });
    console.log(hotelExists);
    const toReturn = {
      address1: hotelExists.address?.data1 ? hotelExists.address.data1 : "",
      address2: hotelExists.address?.data2 ? hotelExists.address.data2 : "",
      city: hotelExists.address?.city ? hotelExists.address.city : "",
      state: hotelExists.address?.state ? hotelExists.address.state : "",
      pin: hotelExists.address?.PIN ? hotelExists.address.PIN : "",
      landmark: hotelExists.address?.landmark
        ? hotelExists.address.landmark
        : "",
      description: hotelExists?.description ? hotelExists.description : "",
      shortDescription: hotelExists?.shortDescription
        ? hotelExists.shortDescription
        : "",
      name: hotelExists?.name,
      status: hotelExists?.status,
    };
    res.status(200).json(toReturn);
  } catch (error) {
    res.status(400).json(error);
  }
};
const updateProfile = async (req, res) => {
  const addressObj = {
    data1: req.body.address1,
    data2: req.body.address2,
    city: req.body.city,
    state: req.body.state,
    PIN: req.body.pin,
    landmark: req.body.landmark,
  };
  try {
    const updatedUser = await hotel.findOneAndUpdate(
      { email: req.user },
      {
        shortDescription: req.body.shortDesc,
        description: req.body.desc,
        address: addressObj,
      },
      { new: true }
    );
    return res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json(error);
  }
};
const responseAddImage = async (req, res) => {
  //get the images Details
  try {
    console.log("Image Uploaded in DB");
    //update the user with the hotel images
    const updateHotel = await hotel.findOneAndUpdate(
      { email: req.user },
      {
        $push: {
          images: { secure_url: req.secure_url, public_id: req.public_id },
        },
      },
      { new: true }
    );
    res.status(200).json("Uploaded Image");
  } catch (error) {
    res.status(400).json(error);
  }
};
const getImages = async (req, res) => {
  console.log(req.user);
  try {
    const hotelExists = await hotel
      .findOne({ email: req.user })
      .select({ images: 1, _id: 0 });
    console.log(hotelExists?.images);
    res.status(200).json(hotelExists?.images);
  } catch (error) {
    res.status(500).json(error);
  }
};
const deleteImage = async (req, res) => {
  console.log(req.body);
  try {
    // const updatedImages = await hotel.findOneAndUpdate({imageId: imageId});
    const hotelExists = await hotel.findOne({ _id: req.body.hotelId });
    const imagesArray = hotelExists?.images;
    //filter out images from the array
    const x = imagesArray.filter(
      (curr, index) => String(curr?._id) != String(req.body.imageId)
    );
    console.log(x);
    const updatedHotel = await hotel.findOneAndUpdate(
      { _id: req.body.hotelId },
      { images: x },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(400).json(error);
  }
};
const updatePets = async (req, res) => {
  try {
    //update the hoetl with pets
    const updatedHotel = await hotel.findOneAndUpdate(
      { email: req.user },
      { petsAllowed: req.body.array },
      { new: true }
    );
    res.status(200).json("okay");
  } catch (error) {
    res.status(400).json(error);
  }
};
const getPets = async (req, res) => {
  try {
    const hotelFind = await hotel.findOne({ email: req.user });
    res.status(200).json(hotelFind.petsAllowed);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
const createService = async (req, res) => {
  try {
    //create the price to Number of
    let services = [];
    if (req.body.s1 !== "") {
      services.push(req.body.s1);
    }
    if (req.body.s2 !== "") {
      services.push(req.body.s2);
    }
    if (req.body.s3 !== "") {
      services.push(req.body.s3);
    }
    if (req.body.s4 !== "") {
      services.push(req.body.s4);
    }
    const finalObject = {
      servicePrice: Number(req.body.price),
      serviceTime: req.body.time,
      serviceNote: req.body.note,
      servicePet: req.body.pet,
      servicesList: services,
    };

    //update the hotel Now
    const updateHotel = await hotel.findOneAndUpdate(
      { email: req.user },
      { $push: { services: finalObject } },
      { new: true }
    );
    res.status(201).json("Updated");
  } catch (error) {
    res.json(400).json(error);
  }
};
const getServices = async (req, res) => {
  try {
    const hotelFind = await hotel.findOne({ email: req.user });
    res.status(200).json(hotelFind.services ? hotelFind.services : []);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
const deleteService = async (req, res) => {
  console.log(req.params.id);
  try {
    const hotelFound = await hotel.findOne({ email: req.user });
    const services = hotelFound.services;
    console.log(services.length);
    let serviceUpdated = services.filter((curr, index) => {
      return curr?._id != req.params.id;
    });
    console.log(serviceUpdated.length);
    const hotelUpdated = await hotel.findOneAndUpdate(
      { email: req.user },
      { services: serviceUpdated },
      { new: true }
    );
    return res.status(200).json("Deleted");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const getHotelBook = async (req, res) => {
  console.log(req.params);
  try {
    const e1 = await Booking.find({ hotel: req.params.id, status: "Pending" })
      .populate("hotel")
      .populate("user");
    const e2 = await Booking.find({ hotel: req.params.id, status: "Accepted" })
      .populate("hotel")
      .populate("user");
    const e3 = await Booking.find({ hotel: req.params.id, status: "Cancelled" })
      .populate("hotel")
      .populate("user");

    res.status(200).json({ e1, e2, e3 });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
const acceptRejectBooking = async (req, res) => {
  console.log(req.body);
  try {
    const { status } = req.body;
    const getBooking = await Booking.findOne({
      _id: req.body.bookingId,
    }).select({
      billingDetails: 1,
      bookingId: 1,
    });
    console.log(getBooking);
    if (status) {
      let shallow = acceptBooking;
      shallow = shallow.replace("{BOOKING_ID}", getBooking?.bookingId);
      await mailer(
        getBooking?.billingDetails?.billingEmail,
        "Booking Accepted at Pet Hotel",
        shallow
      );
      //change the status to Accepted,
      let x = await Booking.findByIdAndUpdate(
        req.body.bookingId,
        { status: "Accepted" },
        { new: true }
      );
    } else {
      let shallow = rejectBooking;
      shallow = shallow.replace("{BOOKING_ID}", getBooking?.bookingId);
      await mailer(
        getBooking?.billingDetails?.billingEmail,
        "Booking Cancelled at Pet Hotel",
        shallow
      );
      let x = await Booking.findByIdAndUpdate(
        req.body.bookingId,
        { status: "Cancelled" },
        { new: true }
      );
    }
    res.status(200).json("Updated Status");
  } catch (error) {
    res.status(500).json(error);
  }
};
const changeState = async (req, res) => {
  console.log("REQ BODY : ", req.body);
  try {
    const h = await hotel.findByIdAndUpdate(
      req.body.id,
      { status: req.body.state },
      { new: true }
    );
    console.log(h);
    res.status(200).json("Okay");
  } catch (error) {
    res.status(400).json(error);
  }
};
const obj = {
  createCoupon,
  getCoupons,
  deleteCoupon,
  getProfile,
  updateProfile,
  responseAddImage,
  getImages,
  deleteImage,
  updatePets,
  getPets,
  createService,
  getServices,
  deleteService,
  getHotelBook,
  acceptRejectBooking,
  changeState,
};
module.exports = obj;
