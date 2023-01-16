const jwt = require("jsonwebtoken");
const {
  createAccessToken,
  createRefreshToken,
} = require("../services/jwt.token");

const authenticateUser = function (req, res, next) {
  const accessToken = req.cookies.jwt;
  if (accessToken) {
    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          if (err.message === "jwt expired") {
            const refreshToken = req.cookies.rjwt;
            if (!refreshToken) {
              return res.send(403).json({ error: "Access Denied" });
            }
            jwt.verify(
              refreshToken,
              process.env.REFRESH_TOKEN_SECRET,
              async (err, decodedToken) => {
                if (err) {
                  console.log(err.message);
                  return res.send(403).json({ error: "Access Denied" });
                }
                console.log(decodedToken);
                const accessToken = await createAccessToken(decodedToken.id);
                const refToken = await createRefreshToken(decodedToken.id);
                res.cookie("jwt", accessToken, {
                  httpOnly: true,
                  maxAge: 10 * 60 * 60 * 1000,
                });
                res.cookie("rjwt", refToken, {
                  httpOnly: true,
                  maxAge: 86400 * 7 * 1000,
                });
                return res.status(200).json({ success: "Token refreshed" });
              }
            );
          } else {
            return res.status(403).json({ error: "Access Denied" });
          }
        } else {
          console.log(decodedToken);
          res.locals = decodedToken;
          next();
        }
      }
    );
  } else {
    res.status(401).json({ error: "Authentication failed" });
  }
};

module.exports = {
  authenticateUser,
};
