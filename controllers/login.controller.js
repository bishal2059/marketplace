const { getUser } = require("../model/users.model");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET);
};

const httploginHandler = async function (req, res) {
  const { email, password } = req.body;
  try {
    const userData = await getUser(email, password);

    const token = createToken(userData._id);

    res.cookie("jwt", token, { httpOnly: true });

    res.status(200).json({ user: userData._id });
  } catch (err) {
    const errorObject = {};
    if (err.message.includes("Email")) {
      errorObject.email = err.message;
    } else {
      errorObject.password = err.message;
    }
    return res.status(400).json({
      errors: errorObject,
    });
  }
};

module.exports = {
  httploginHandler,
};
