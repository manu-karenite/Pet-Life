const Checkout = require("../../Models/Checkout.js");
const users = require("../../Models/Users.js");
const hotel = require("../../Models/Hotel.js");
const { nanoid } = require("nanoid");
const Booking = require("../../Models/Booking.js");
const newBookingTemplate = require("../../Utitlities/Templates/User/newBooking.js");
const mailer = require("../../Utitlities/Mailers/transporter.js");
const temp = require("../../Utitlities/Templates/Hotel/newBooking.js");
const createCheckout = async (req, res) => {
  const { user, hotel, serviceId } = req.body;
  try {
    if (!user) throw "User Id Not Found";
    if (!hotel) throw "Hotel Id Not Found";
    if (!serviceId) throw "Hotel Service Not Chosen";
    //we are here, it means everything is existing and
    //remove if any previous exists...data
    const deleted = await Checkout.findOneAndDelete({ user: user });
    let newQuery = new Checkout({
      user,
      hotel,
      serviceId,
    });
    newQuery = await newQuery.save();
    console.log(newQuery);
    res.status(201).json("Okay");
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
const getSavedItem = async (req, res) => {
  // get the id from req object;
  try {
    const savedItem = await Checkout.findOne({ user: req._id })
      .populate({
        path: "user",
        users,
      })
      .populate({ path: "hotel", hotel });
    res.status(200).json(savedItem);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
const createBooking = async (req, res) => {
  try {
    //what do we need? service Details
    const hotelHere = await hotel.findOne({ _id: req.body.hotel });
    let service = null;

    for (let i = 0; i < hotelHere.services.length; i++) {
      if (String(hotelHere.services[i]._id) == req.body.serviceId) {
        service = hotelHere.services[i];
        break;
      }
    }

    const toSave = {
      user: req.body.user,
      hotel: req.body.hotel,
      serviceId: req.body.serviceId,
      time: new Date(req.body.slot),
      coupon: req.body.coupon ? req.body.coupon : "",
      couponDiscount: req.body.couponDiscount
        ? Number.parseInt(req.body.couponDiscount)
        : 0,
      baseCharge: Number.parseInt(service.servicePrice),
      taxes: Number.parseInt(0.18 * service.servicePrice),
      charge: Number.parseInt(req.body.charge),
      total: Number.parseInt(
        Number(service.servicePrice) +
          Number(0.18 * service.servicePrice) +
          Number(req.body.charge) -
          (req.body.couponDiscount ? Number(req.body.couponDiscount) : 0)
      ),
      pet: req.body.pet,
      paymentMode: req.body.paymentMethod,
      bookingId: nanoid(),
      billingDetails: {
        billingEmail: req.body.form.email,
        billingName: req.body.form.name,
        billingContact: req.body.form.contact,
        billingAddress1: req.body.form.add1,
        billingAddress2: req.body.form.add2,
        billingPin: req.body.form.pin,
        billingCity: req.body.form.city,
        billingState: req.body.form.state,
      },
    };

    let query = new Booking(toSave);
    query = await query.save();
    //LETS'S SEND A MAIL HERE TO THE BILLING USER...
    //create a shallowcopy of the mail..
    let shallowCopy = newBookingTemplate;
    //replace all the details with user defined details...
    shallowCopy = shallowCopy.replace(
      "{BILLING_NAME}",
      query?.billingDetails?.billingName
    );
    shallowCopy = shallowCopy.replace(
      "{DATE_OF_BOOKING}",
      new Date(query?.createdAt)
    );
    shallowCopy = shallowCopy.replace("{BOOKING_ID}", query?.bookingId);
    shallowCopy = shallowCopy.replace("{PAYMENT_MODE}", query?.paymentMode);
    shallowCopy = shallowCopy.replace("{HOTEL_NAME}", hotelHere?.name);
    shallowCopy = shallowCopy.replace(
      "{ADDRESS_LINE_1}",
      hotelHere?.address?.data1 + " " + hotelHere?.address?.data2
    );
    shallowCopy = shallowCopy.replace(
      "{ADDRESS_LINE_2}",
      hotelHere?.address?.city +
        " " +
        hotelHere?.address?.state +
        " " +
        hotelHere?.address?.PIN +
        " " +
        "India"
    );
    shallowCopy = shallowCopy.replace("{SERVICE_PET}", service?.servicePet);
    shallowCopy = shallowCopy.replace("{slot_time}", new Date(query?.time));
    shallowCopy = shallowCopy.replace(
      "{SUBTOTAL_AMOUNT}",
      "₹ " + query?.baseCharge
    );
    shallowCopy = shallowCopy.replace(
      "{DISCOUNT_AMOUNT}",
      "₹ " + query?.couponDiscount
    );
    shallowCopy = shallowCopy.replace(
      "{PICKUP_CHARGE_AMOUNT}",
      "₹ " + query?.charge
    );
    shallowCopy = shallowCopy.replace("{TAX_AMOUNT}", "₹ " + query?.taxes);
    shallowCopy = shallowCopy.replace("{FINAL_AMOUNT}", "₹ " + query?.total);

    //Filling Billing Details...
    shallowCopy = shallowCopy.replace(
      "{BILLER_NAME}",
      query?.billingDetails?.billingName
    );
    shallowCopy = shallowCopy.replace(
      "{BILLING_ADDRESS1}",
      query?.billingDetails?.billingAddress1
    );
    shallowCopy = shallowCopy.replace(
      "{BILLING_CITY}",
      query?.billingDetails?.billingCity
    );
    shallowCopy = shallowCopy.replace(
      "{BILLING_STATE}",
      query?.billingDetails?.billingState
    );
    shallowCopy = shallowCopy.replace(
      "{BILLING_ADDRESS2}",
      query?.billingDetails?.billingAddress2
    );
    shallowCopy = shallowCopy.replace(
      "{BILLING_PIN}",
      query?.billingDetails?.billingPin
    );
    shallowCopy = shallowCopy.replace(
      "{IMAGE_OF_HOTEL}",
      hotelHere?.images[0]?.secure_url
    );
    const sentMail = await mailer(
      query?.billingDetails?.billingEmail,
      `Booking Confirmation at ${hotelHere?.name}`,
      shallowCopy
    );

    //FOR ADMIN SIDE......AND HOTEL SIDE
    let adminSide = temp;
    //replace all the details with user defined details...
    adminSide = adminSide.replace(
      "{BILLING_NAME}",
      query?.billingDetails?.billingName
    );
    adminSide = adminSide.replace(
      "{DATE_OF_BOOKING}",
      new Date(query?.createdAt)
    );
    adminSide = adminSide.replace("{BOOKING_ID}", query?.bookingId);
    adminSide = adminSide.replace("{PAYMENT_MODE}", query?.paymentMode);
    adminSide = adminSide.replace("{HOTEL_NAME}", hotelHere?.name);
    adminSide = adminSide.replace(
      "{ADDRESS_LINE_1}",
      hotelHere?.address?.data1 + " " + hotelHere?.address?.data2
    );
    adminSide = adminSide.replace(
      "{ADDRESS_LINE_2}",
      hotelHere?.address?.city +
        " " +
        hotelHere?.address?.state +
        " " +
        hotelHere?.address?.PIN +
        " " +
        "India"
    );
    adminSide = adminSide.replace("{SERVICE_PET}", service?.servicePet);
    adminSide = adminSide.replace("{slot_time}", new Date(query?.time));
    adminSide = adminSide.replace(
      "{SUBTOTAL_AMOUNT}",
      "₹ " + query?.baseCharge
    );
    adminSide = adminSide.replace(
      "{DISCOUNT_AMOUNT}",
      "₹ " + query?.couponDiscount
    );
    adminSide = adminSide.replace(
      "{PICKUP_CHARGE_AMOUNT}",
      "₹ " + query?.charge
    );
    adminSide = adminSide.replace("{TAX_AMOUNT}", "₹ " + query?.taxes);
    adminSide = adminSide.replace("{FINAL_AMOUNT}", "₹ " + query?.total);

    //Filling Billing Details...
    adminSide = adminSide.replace(
      "{BILLER_NAME}",
      query?.billingDetails?.billingName
    );
    adminSide = adminSide.replace(
      "{BILLING_ADDRESS1}",
      query?.billingDetails?.billingAddress1
    );
    adminSide = adminSide.replace(
      "{BILLING_CITY}",
      query?.billingDetails?.billingCity
    );
    adminSide = adminSide.replace(
      "{BILLING_STATE}",
      query?.billingDetails?.billingState
    );
    adminSide = adminSide.replace(
      "{BILLING_ADDRESS2}",
      query?.billingDetails?.billingAddress2
    );
    adminSide = adminSide.replace(
      "{BILLING_PIN}",
      query?.billingDetails?.billingPin
    );
    adminSide = adminSide.replace(
      "{IMAGE_OF_HOTEL}",
      hotelHere?.images[0]?.secure_url
    );
    const sentMail1 = await mailer(
      "business.petlife@gmail.com",
      `New Booking for ${hotelHere?.name}`,
      adminSide
    );
    const sentMail2 = await mailer(
      hotelHere?.email,
      `New Booking for ${hotelHere?.name}`,
      adminSide
    );
    console.log(sentMail);
    res.status(201).json("Created");
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
const checkCoupon = async (req, res) => {
  console.log(req.body);
  try {
    const getHotel = await hotel
      .findOne({ _id: req.body.hotelId })
      .sort({ discount: 1 });
    let curr = null;
    for (let i = 0; i < getHotel?.coupons?.length; i++) {
      console.log(String(getHotel?.coupons[i]?.name), req.body.name);
      if (String(getHotel?.coupons[i]?.name) == req.body.name) {
        curr = getHotel?.coupons[i];
        break;
      }
    }
    if (curr === null) {
      throw "No Coupon Found";
    }
    console.log(curr);
    res.status(200).json(curr);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
const obj = { createCheckout, getSavedItem, createBooking, checkCoupon };
module.exports = obj;
