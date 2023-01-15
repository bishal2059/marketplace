const jwt = require("jsonwebtoken");
const usersModel = require("../model/users.mongo");

const authenticateUser = function (req, res, next) {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        return res.status(403).json({ error: "Access Denied" });
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.status(401).json({ error: "Authentication failed" });
  }
};

module.exports = {
  authenticateUser,
};
