const jwt = require("jsonwebtoken");

const createAccessToken = async (id) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "10m",
      },
      (err, token) => {
        if (err) reject("Internal Server Error");
        resolve(token);
      }
    );
  });
};

const createRefreshToken = async (id) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1w",
      },
      (err, token) => {
        if (err) reject("Internal Server Error");
        resolve(token);
      }
    );
  });
};

module.exports = {
  createAccessToken,
  createRefreshToken,
};
