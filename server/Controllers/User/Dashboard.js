const users = require("../../Models/Users.js");

const getUserProfile = async (req, res) => {
  try {
    // console.log(req.user);
    // console.log(req.query);
    const userExists = await users.findOne({ _id: req.query.id });
    // console.log(userExists);
    const toReturn = {
      address1: userExists.address?.data1 ? userExists.address.data1 : "",
      address2: userExists.address?.data2 ? userExists.address.data2 : "",
      city: userExists.address?.city ? userExists.address.city : "",
      state: userExists.address?.state ? userExists.address.state : "",
      pin: userExists.address?.PIN ? userExists.address.PIN : "",
      contact: userExists?.contact ? userExists.contact : "",
      petname: userExists?.petname ? userExists.petname : "",
      petage: userExists?.petage ? userExists.petage : "",
      allergy: userExists?.allergy ? userExists.allergy : "",
      food: userExists?.food ? userExists.food : "",
      category: userExists?.category ? userExists.category : "",
    };
    console.log("toReturn",toReturn)
    res.status(200).json(toReturn);
  } catch (error) {
    res.status(400).json(error);
  }
};
const updateUserProfile = async (req, res) => {
  const addressObj = {
    data1: req.body.address1,
    data2: req.body.address2,
    city: req.body.city,
    state: req.body.state,
    PIN: req.body.pin,
  };
  try {
    console.log(req.body.userId)
    const updatedUser = await users.findByIdAndUpdate(
      req.body.userId,
      {
        contact: req.body.contact,
        petname: req.body.petname,
        petage: req.body.petage,
        allergy: req.body.allergy,
        food: req.body.food,
        category: req.body.category,
        address: addressObj,
      },
      { new: true }
    );
    console.log(updatedUser)
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error)
    res.status(400).json(error);
  }
};
const obj = {
  getUserProfile,
  updateUserProfile,
};
module.exports = obj;
