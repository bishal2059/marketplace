const jwt = require("jsonwebtoken");

const verifyToken = async function (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (error, decodedToken) => {
        if (error) {
          console.log(error.message);
          if (error.message === "jwt expired") {
            reject("Token Expired");
          } else {
            reject("Token Unverified");
          }
        } else {
          resolve(decodedToken);
        }
      }
    );
  });
};

const mailTokenVerification = async function (req, res, next) {
  const token = req.params.token;
  if (!token) {
    return res.status(400).send("Token ID is missing");
  }
  try {
    const decodedToken = await verifyToken(token);
    res.locals = decodedToken;
    next();
  } catch (err) {
    return res.status(400).send(`An error occured: ${err}. Please try again`);
  }
};

module.exports = {
  mailTokenVerification,
};
