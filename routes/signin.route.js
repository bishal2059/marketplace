const express = require("express");

const { httpsignInHandler } = require("../controllers/signin.controller");

const signInRoute = express.Router();

signInRoute.post("/", httpsignInHandler);

module.exports = signInRoute;
