const hotel = require("../../Models/Hotel.js");

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
const obj = {
  createCoupon,
  getCoupons,
  deleteCoupon,
  getProfile,
  updateProfile,
  responseAddImage,
  getImages,
  updatePets,
  getPets,
  createService,
  getServices,
  deleteService,
};
module.exports = obj;
