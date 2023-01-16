const { getUser } = require("../model/users.model");

const {
  createAccessToken,
  createRefreshToken,
} = require("../services/jwt.token");

const httploginHandler = async function (req, res) {
  const { email, password } = req.body;
  try {
    const userData = await getUser(email, password);

    const accessToken = await createAccessToken(userData._id);
    const refreshToken = await createRefreshToken(userData._id);
    res.cookie("jwt", accessToken, {
      httpOnly: true,
      maxAge: 10 * 60 * 60 * 1000,
    });
    res.cookie("rjwt", refreshToken, {
      httpOnly: true,
      maxAge: 86400 * 7 * 1000,
    });
    res.status(200).json({ user: userData._id });
  } catch (err) {
    const errorObject = {};
    if (err.message === "Internal Server Error") {
      return res.status(500).json({ error: err.message });
    }
    if (err.message.includes("Email")) {
      errorObject.email = err.message;
    } else {
      errorObject.password = err.message;
    }
    return res.status(400).json({
      error: errorObject,
    });
  }
};

module.exports = {
  httploginHandler,
};
