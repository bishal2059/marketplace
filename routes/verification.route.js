const express = require("express");
const {
  httpVerificationHandler,
  httpEmailVerificationHandler,
} = require("../controllers/verification.controller");
const { authenticateUser } = require("../middleware/auth.middleware");
const { mailTokenVerification } = require("../middleware/mailToken.middleware");

const verificationRouter = express.Router();

verificationRouter.get("/", authenticateUser, httpVerificationHandler);
verificationRouter.get(
  "/:token",
  mailTokenVerification,
  httpEmailVerificationHandler
);

module.exports = verificationRouter;
