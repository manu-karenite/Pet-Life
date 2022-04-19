const hotel = require("../../Models/Hotel.js");
const transporter = require("../../Utitlities/Mailers/transporter.js");
const registrationTemplate = require("../../Utitlities/Templates/Hotel/Registration.js");
const OTPTemplate = require("../../Utitlities/Templates/Hotel/ForgotPasswordOTP.js");
const signToken = require("../../Utitlities/JWTHandlers/signToken.js");
const verifyToken = require("../../Utitlities/JWTHandlers/verifyToken.js");
const { promisify } = require("util");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerHotel = async (req, res) => {
  console.log(req.body);
  let { name, email, contact, owner } = req.body;
  try {
    if (!name || !email || !contact || !owner) {
      throw "Insufficient Details Found! Please Fill in the details Carefully";
    }
    const re1 = new RegExp("^[a-zA-Z ]+$");
    const re2 = new RegExp("^[a-zA-Z0-9._]+@[a-zA-Z.]+$");
    const re3 = new RegExp("^[0-9]{10}$");
    const re4 = new RegExp("^[a-zA-Z ]+$");

    if (!name.match(re1)) throw "Please Enter a Valid Hotel Name";
    if (!email.match(re2)) throw "Please Enter a Valid Email Address of Hotel";
    if (!contact.match(re3))
      throw "Please Enter a Valid Phone Number of 10 Digits!";
    if (!owner.match(re4)) throw "Please Enter a Valid Owner's Name!";

    //query the DB for any email present or not!
    const checkEmail = await hotel.findOne({ email: email });
    if (checkEmail) {
      throw "Hotel Already Registered with Email Address! Please Login to Continue!";
    }
    const checkContact = await hotel.findOne({ contact: contact });
    if (checkContact) {
      throw "Hotel Already Registered with Contact Number! Please Login to Continue!";
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
    console.log(result);
    res.status(200).json("ok");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const registerHotelConfirm = async (req, res) => {
  console.log(req.body);
  try {
    if (!req.body.checked) {
      throw "Please Accept the Terms and Conditions";
    }
    if (!req.body.password || !req.body.confirmPassword) {
      throw "Please fill in the Password, and Confirm Password Fields";
    }
    if (!req.body.email) {
      throw "Please enter the email-address";
    }
    if (!req.body.name) {
      throw "Please fill in the Hotel Name";
    }
    if (!req.body.owner) {
      throw "Please fill in the Owner's Name";
    }
    if (!req.body.phone) {
      throw "Please fill in the Hotel's Contact Number";
    }

    //2)check whether the passwords and confirm passwords meet or not,
    if (req.body.password !== req.body.confirmPassword) {
      throw "Passwords Don't Match! Try Again";
    }

    //3) check whether user has already been assigned profile, and is creating old link, by mainpuating JWT
    const hotelFound = await hotel.findOne({ email: req.body.email });
    if (hotelFound) {
      throw "Hotel Already exists, as our Partner. Login to Continue";
    }

    //4), check for the JWT VALIDITY
    const result = await verifyToken(req.body.jwt);
    console.log(result);
    if (!result.iat) {
      throw "JWT Malformed";
    }
    if (result.parameter !== req.body.email) {
      throw "Inavlid Mail Link! Please Try Again";
    }

    //now its safe to insert the user to Database and create a Hotel
    const encryptedPassword = await bcrypt.hash(req.body.password, 15);
    console.log(encryptedPassword);

    let newHotel = new hotel({
      name: req.body.name,
      contact: req.body.phone,
      email: req.body.email,
      password: encryptedPassword,
    });
    newHotel = await newHotel.save();
    res.status(201).json("Created");
  } catch (error) {
    res.status(400).json(error);
  }
  //1) check for the empty details first, and send an error if there is one
};

const loginHotel = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      throw "Incomplete Details";
    }
    const re2 = new RegExp("^[a-zA-Z0-9._]+@[a-zA-Z.]+$");
    const x = username.match(re2);
    if (!x) throw "Please Enter a Valid Email Address";
    //1) check whether hotel exists with email or phone in the username filed
    let result = await hotel.findOne({ email: username });
    if (!result) {
      result = await hotel.findOne({ contact: username });
    }
    if (!result) {
      throw "No Hotel Found with the username. Please Try Again";
    }
    //if we are here, it means we have a valid user! Now check for password correct or not.
    const passwordValid = await bcrypt.compare(password, result.password);
    if (!passwordValid) {
      throw "Password Incorrected!";
    }
    //otherwise, the password is correct, so we
    //1) create a jwt token, and send it to the user, accessing it
    const jwtCreated = await jwt.sign(
      { email: result.email },
      process.env.JWT_SECRET,
      {
        expiresIn: 24 * 60 * 60,
      }
    );
    const toReturn = {
      _id: result._id,
      name: result.name,
      contact: result.contact,
      email: result.email,
      status: result.status,
      jwt: jwtCreated,
    };
    console.log(toReturn);
    res.status(200).json(toReturn);
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};
const verifyHotel = async (req, res) => {
  try {
    console.log(req.headers.token);
    console.log(req.query);
    if (!req.headers.authorization) {
      throw "JWT Not Found";
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token || token.length < 5) {
      throw "Invalid Token";
    }
    //check for jwt token here to send
    const decodedToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );
    console.log(decodedToken);
    if (!decodedToken.email || decodedToken.email !== req.query.email) {
      throw "Invalid JWT";
    }
    //NOW CHECK FOR THE EXPIRY TIME
    if (decodedToken.exp * 1000 < Date.now()) {
      throw "JWT Expired";
    }
    console.log("VERIFIED");
    res.status(200).json("ok");
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};
const forgotPassword = async (req, res) => {
  try {
    const hotelExists = await hotel.findOne({ email: req.body.email });
    if (!hotelExists) {
      throw "No Hotel Registered with this Email-Id";
    }
    let shallowCopy = OTPTemplate;
    shallowCopy = shallowCopy.replace("FullName", hotelExists.name);
    shallowCopy = shallowCopy.replace("ACCOUNT_EMAIL", hotelExists.email);
    //create an OTP number
    const random = Math.floor(Math.random() * 899999) + 100001; //6 digit OTP
    const updated = await hotel.findByIdAndUpdate(hotelExists._id, {
      otp: random,
      otpValidUpto: Date.now() + 15 * 60 * 1000,
    });
    shallowCopy = shallowCopy.replace("OTP", random);
    const result = await transporter(
      hotelExists.email,
      "One Time Password for Hotels",
      shallowCopy
    );
    console.log(result);
    res.status(200).json(hotelExists.email);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      throw "Details Missing";
    }
    const user = await hotel
      .findOne({ email: email })
      .select({ otp: 1, otpValidUpto: 1, _id: 0 });
    console.log(user);

    if (otp !== user.otp) {
      throw "OTP Invalid";
    }
    if (Date.now() >= new Date(user.otpValidUpto)) {
      throw "OTP Expired! Please";
    }
    return res.status(200).json("ok");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
const updatePassword = async (req, res) => {
  try {
    const { pass, confirmpass, email } = req.body;
    if (!pass || !confirmpass || !email) {
      throw "Incomplete Details. Cannot Continue";
    }
    if (pass !== confirmpass) {
      throw "Passwords don't Match! Please check again and retry";
    }
    const hash = await bcrypt.hash(pass, 12);
    console.log(hash);
    const user = await hotel.findOneAndUpdate(
      { email: email },
      { password: hash, $unset: { otp: 1, otpValidUpto: 1 } },
      { new: true }
    );
    res.status(200).json("ok");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const object = {
  registerHotel,
  registerHotelConfirm,
  loginHotel,
  verifyHotel,
  forgotPassword,
  verifyOTP,
  updatePassword,
};
module.exports = object;
