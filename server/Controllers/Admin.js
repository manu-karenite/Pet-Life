const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username) {
      throw "No Email Address Found!";
    }
    if (!password) {
      throw "No Password Found!";
    }
    if (username !== process.env.ADMIN_MAIL) throw "Incorrect Email Address";
    if (password !== process.env.ADMIN_PASSWORD) throw "Incorrect Password";

    //IF ALL CORRECT, create a jwt and sign the user in..
    const jwtCreated = await jwt.sign(
      { email: username },
      process.env.JWT_SECRET,
      {
        expiresIn: 2 * 60 * 60,
      }
    );
    res.status(200).json(jwtCreated);
  } catch (err) {
    console.log("FROM LOGIN ADMIN", err);
    res.status(401).json(err);
  }
};
const verifyJWT = async (req, res) => {
  console.log(req.body);
  try {
    const decodedToken = await promisify(jwt.verify)(
      req.body.JWT,
      process.env.JWT_SECRET
    );
    console.log(decodedToken);
    const { email, exp } = decodedToken;
    if (!email) {
      throw "JSON WEB TOKEN Malformed";
    }
    if (email !== process.env.ADMIN_MAIL) {
      throw "Admin Privileges Denied";
    }
    console.log("RETURN OKAY");
    return res.status(200).json("Okay");
  } catch (err) {
    console.log(err);
    res.status(401).json(err);
  }
};
const obj = { loginAdmin, verifyJWT };

module.exports = obj;
