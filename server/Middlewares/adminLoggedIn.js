const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const adminLoggedIn = async (req, res, next) => {
  //we have jwt in headers......
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
    if (decodedToken.email !== process.env.ADMIN_MAIL) throw "Access Denied";
    next();
  } catch (error) {
    res.status(401).json(error);
  }
};
const obj = { adminLoggedIn };
module.exports = obj;
