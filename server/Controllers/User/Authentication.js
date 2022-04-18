const User = require("../../Models/Users.js");
const transporter = require("../../Utitlities/Mailers/usertrans.js");
const registrationTemplate = require("../../Utitlities/Templates/User/UserRegistration.js");
const OTPTemplate = require("../../Utitlities/Templates/Hotel/ForgotPasswordOTP.js");
const signToken = require("../../Utitlities/JWTHandlers/signToken.js");
const verifyToken = require("../../Utitlities/JWTHandlers/verifyToken.js");
const { promisify } = require("util");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ContactUS = require("../../Utitlities/Templates/User/ContactUs.js");

const Booking = require("../../Models/Booking.js");
const Checkout = require("../../Models/Checkout.js");
const pets = require("../../Models/Pets.js");
const reviews = require("../../Models/Review.js");
const { isEmail } = require("validator");
const registerUser = async (req, res) => {
  let { name, email, password } = req.body;
  try {
    if (!name || !email) {
      throw "Insufficient Details Found! Please Fill in the details Carefully";
    }
    //matching regexp for name and email matches
    const re1 = new RegExp("^[a-zA-Z ]+$");
    const ans1 = name.match(re1);
    if (!ans1) throw "Please Enter a Valid Name with Letters and Spaces";
    const re2 = new RegExp("^[a-zA-Z0-9._]+@[a-zA-Z.]+$");
    const result1 = email.match(re2);
    if (!result1) {
      throw "Invalid Email Entered! Please Try Again!";
    }

    //query the DB for any email present or not!
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      throw "User Already Registered with Email Address! Please Login to Continue!";
    }
    //lets check whether email is going or not already
    let shallowCopy = registrationTemplate;
    //create template according to you
    shallowCopy = shallowCopy.replace("FullName", name);
    const jwt = await signToken("email", email);
    shallowCopy = shallowCopy.replace(
      "REDIRECT_EMAIL",
      `${process.env.FRONTEND_URL}/register/confirm/${jwt}`
    );
    const result = await transporter(
      email,
      "Users Verification @ Pet Life",
      shallowCopy
    );
    console.log(result);
    res.status(200).json("ok");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const registerUserConfirm = async (req, res) => {
  console.log(req.body);
  try {
    if (!req.body.password || !req.body.confirmPassword) {
      throw "Please fill in the Password, and Confirm Password Fields";
    }
    if (!req.body.email) {
      throw "Please enter the email-address";
    }
    if (!req.body.name) {
      throw "Please fill in the User Name";
    }

    //2)check whether the passwords and confirm passwords meet or not,
    if (req.body.password !== req.body.confirmPassword) {
      throw "Passwords Don't Match! Try Again";
    }

    //3) check whether user has already been assigned profile, and is creating old link, by mainpuating JWT
    const UserFound = await User.findOne({ email: req.body.email });
    if (UserFound) {
      throw "User Already exists, as our Partner. Login to Continue";
    }

    //4), check for the JWT VALIDITY
    const result = await verifyToken(req.body.jwt);
    console.log(result);
    if (!result.iat) {
      throw "JWT Malformed";
    }
    if (result.parameter.toLowerCase() !== req.body.email.toLowerCase()) {
      throw "Inavlid Mail Link! Please Try Again";
    }

    //now its safe to insert the user to Database and create a User
    const encryptedPassword = await bcrypt.hash(req.body.password, 15);
    console.log(encryptedPassword);

    let newUser = new User({
      name: req.body.name,
      email: req.body.email.toLowerCase(),
      password: encryptedPassword,
    });
    newUser = await newUser.save();
    res.status(201).json("Created");
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
  //1) check for the empty details first, and send an error if there is one
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      throw "Incomplete Details";
    }
    const re = new RegExp("^[a-zA-Z0-9._]+@[a-zA-Z.]+$");
    const result1 = username.match(re);
    if (!result1) {
      throw "Invalid Email Entered! Please Try Again!";
    }
    console.log(result1);

    //1) check whether User exists with email or phone in the username filed
    let result = await User.findOne({ email: username });
    if (!result) {
      throw "No User Found with the username. Please Try Again";
    }
    //if we are here, it means we have a valid user! Now check for password correct or not.
    const passwordValid = await bcrypt.compare(password, result.password);
    if (!passwordValid) {
      throw "Password Incorrect!";
    }
    //otherwise, the password is correct, so we
    //1) create a jwt token, and send it to the user, accessing it
    const jwtCreated = await jwt.sign(
      { email: result.email },
      process.env.JWT_SECRET,
      {
        expiresIn: 2 * 60 * 60,
      }
    );
    //get the booking made, and then the pets having.
    const one = await Booking.find({ user: result?._id });
    const two = await pets.find({ user: result?._id });
    const toReturn = {
      _id: result._id,
      name: result.name,
      email: result.email,
      jwt: jwtCreated,
      bookingsMade: one.length,
      petsAdded: two.length,
    };
    console.log(toReturn);
    res.status(200).json(toReturn);
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};
const verifyUser = async (req, res) => {
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
    res.status(200).json("ok");
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};
const forgotPassword = async (req, res) => {
  try {
    const re = new RegExp("^[a-zA-Z0-9._]+@[a-zA-Z.]+$");
    const result1 = req.body.email.match(re);
    if (!result1) {
      throw "Invalid Email Entered! Please Try Again!";
    }
    const userExists = await User.findOne({ email: req.body.email });
    if (!userExists) {
      throw "No user Registered with this Email-Id";
    }
    let shallowCopy = OTPTemplate;
    shallowCopy = shallowCopy.replace("FullName", userExists.name);
    shallowCopy = shallowCopy.replace("ACCOUNT_EMAIL", userExists.email);
    //create an OTP number
    const random = Math.floor(Math.random() * 899999) + 100001; //6 digit OTP
    const updated = await User.findByIdAndUpdate(userExists._id, {
      otp: random,
      otpValidUpto: Date.now() + 15 * 60 * 1000,
    });
    shallowCopy = shallowCopy.replace("OTP", random);
    const result = await transporter(
      userExists.email,
      "One Time Password for User",
      shallowCopy
    );
    console.log(result);
    res.status(200).json(userExists.email);
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
    const user = await User.findOne({ email: email }).select({
      otp: 1,
      otpValidUpto: 1,
      _id: 0,
    });
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
    const user = await User.findOneAndUpdate(
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
const contactUs = async (req, res) => {
  console.log(req.body);
  const { name, email, data } = req.body;
  try {
    if (!name) {
      throw "Please Enter Full Name";
    }
    if (!email) {
      throw "Please Enter Email Address Name";
    }
    const re = new RegExp("^[a-zA-Z0-9._]+@[a-zA-Z.]+$");
    const result1 = email.match(re);
    if (!result1) {
      throw "Invalid Email Entered! Please Try Again!";
    }
    if (!data) {
      throw "Please Enter Your Message";
    }
    //now we can send the message
    let shallowCopy = ContactUS; //shallow copy created
    shallowCopy = shallowCopy.replace("{{SENDER_NAME}}", req.body.name);
    shallowCopy = shallowCopy.replace("{{SENDER_NAME}}", req.body.name);
    //two times because, there are two places to replace the email
    shallowCopy = shallowCopy.replace("{{SENDER_EMAIL}}", req.body.email);
    shallowCopy = shallowCopy.replace("{{SENDER_MESSAGE}}", req.body.data);

    //now our template is readyn , and we are ready to send the message

    const result = await transporter(
      "business.petlife@gmail.com",
      `Message from ${req.body.name}`,
      shallowCopy
    );
    console.log(result);
    return res.status(200).json("Okay");
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
const changePasswordCreateOTP = async (req, res) => {
  try {
    const userExists = await User.findOne({ _id: String(req._id) });
    if (!userExists) {
      throw "No user Registered with this Email-Id";
    }

    let shallowCopy = OTPTemplate;
    shallowCopy = shallowCopy.replace("FullName", userExists.name);
    shallowCopy = shallowCopy.replace("ACCOUNT_EMAIL", userExists.email);
    //create an OTP number
    const random = Math.floor(Math.random() * 899999) + 100001; //6 digit OTP
    const updated = await User.findByIdAndUpdate(userExists._id, {
      otp: random,
      otpValidUpto: Date.now() + 15 * 60 * 1000,
    });
    shallowCopy = shallowCopy.replace("OTP", random);
    const result = await transporter(
      userExists.email,
      "One Time Password for User",
      shallowCopy
    );
    console.log(result);
    res.status(200).json(userExists.email);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
const changePasswordVerifyOTP = async (req, res) => {
  console.log(req.body);
  try {
    const { otp } = req.body;

    const user = await User.findOne({ _id: req._id }).select({
      otp: 1,
      otpValidUpto: 1,
      _id: 0,
    });
    console.log(user);

    if (otp !== user.otp) {
      throw "OTP Invalid";
    }
    if (Date.now() >= new Date(user.otpValidUpto)) {
      throw "OTP Expired! Please Retry Sending a Fresh OTP";
    }
    return res.status(200).json("ok");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
const changePasswordSetPassword = async (req, res) => {
  try {
    const { pass, confirmpass } = req.body;
    if (!pass || !confirmpass) {
      throw "Incomplete Details. Cannot Continue";
    }
    if (pass !== confirmpass) {
      throw "Passwords don't Match! Please check again and retry";
    }
    const hash = await bcrypt.hash(pass, 12);
    console.log(hash);
    const user = await User.findOneAndUpdate(
      { _id: req._id },
      { password: hash, $unset: { otp: 1, otpValidUpto: 1 } },
      { new: true }
    );
    res.status(200).json("ok");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const deleteProfile = async (req, res) => {
  //what to delete ?
  //1)reviews,booking,user,checkout,pets
  console.log(req.body);
  console.log(req.params);

  try {
    let result = await User.findOne({ _id: req.params.id });
    if (!result) {
      throw "User Not Found!";
    }
    //if we are here, it means we have a valid user! Now check for password correct or not.
    const passwordValid = await bcrypt.compare(req.body.pass, result.password);
    if (!passwordValid) {
      throw "Password Incorrect!";
    }
    let deletePets = await pets.deleteMany({ user: req._id });
    deletePets = await Checkout.deleteMany({ user: req._id });
    deletePets = await reviews.deleteMany({ user: req._id });
    deletePets = await Booking.deleteMany({ user: req._id });
    deletePets = await User.deleteMany({ _id: req._id });
    res.status(200).json("Deleted All");
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
const object = {
  registerUser,
  registerUserConfirm,
  loginUser,
  verifyUser,
  forgotPassword,
  verifyOTP,
  updatePassword,
  contactUs,
  changePasswordCreateOTP,
  changePasswordVerifyOTP,
  changePasswordSetPassword,
  deleteProfile,
};
module.exports = object;
