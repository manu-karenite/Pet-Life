const User = require("../../Models/Users.js");
const transporter = require("../../Utitlities/Mailers/usertrans.js");
const registrationTemplate = require("../../Utitlities/Templates/User/UserRegistration.js");
const signToken = require("../../Utitlities/JWTHandlers/signToken.js");
const verifyToken = require("../../Utitlities/JWTHandlers/verifyToken.js");
const { promisify } = require("util");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  let { name, email, password } = req.body;
  try {
    if (!name || !email) {
      throw "Insufficient Details Found! Please Fill in the details Carefully";
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
    if (result.parameter !== req.body.email) {
      throw "Inavlid Mail Link! Please Try Again";
    }

    //now its safe to insert the user to Database and create a User
    const encryptedPassword = await bcrypt.hash(req.body.password, 15);
    console.log(encryptedPassword);

    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: encryptedPassword,
    });
    newUser = await newUser.save();
    res.status(201).json("Created");
  } catch (error) {
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
    const toReturn = {
      _id: result._id,
      name: result.name,
      email: result.email,
      jwt: jwtCreated,
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
const object = { registerUser, registerUserConfirm, loginUser, verifyUser };
module.exports = object;
