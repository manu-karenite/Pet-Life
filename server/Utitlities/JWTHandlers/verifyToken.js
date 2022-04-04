const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const verifyToken = async (token) => {
  try {
    const decodedToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );

    return decodedToken;
  } catch (error) {
    return error;
  }
};
module.exports = verifyToken;
