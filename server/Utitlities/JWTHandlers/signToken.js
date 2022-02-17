const jwt = require("jsonwebtoken");

const signToken = (parameter, payload) => {
  try {
    const result = jwt.sign({ parameter: payload }, process.env.JWT_SECRET, {
      expiresIn: 900,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};
module.exports = signToken;
