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
const obj = { createCoupon, getCoupons, deleteCoupon };
module.exports = obj;
