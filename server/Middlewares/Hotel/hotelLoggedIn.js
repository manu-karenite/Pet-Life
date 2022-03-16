const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const hotelLoggedIn = async (req, res, next) => {
  try {
    if (!req.headers || !req.headers.authorization) {
      throw "Permission Denied";
    }
    if (req.headers.authorization.startsWith("Bearer ") === false) {
      throw "JWT Not Found";
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw "JWT Not Found";
    }

    //now we have the jwt, decode it
    const decodedToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );
    if (!decodedToken || !decodedToken.email || !decodedToken.exp) {
      throw "Invalid JWT";
    }
    if (decodedToken.exp * 1000 < Date.now()) {
      throw "JWT Expired";
    }
    req.user = decodedToken.email;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json(error);
  }
};

module.exports = hotelLoggedIn;
