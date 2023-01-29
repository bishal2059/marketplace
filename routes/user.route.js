const express = require("express");
const { httpGetUser } = require("../controllers/user.controller");

const userRoute = express.Router();

userRoute.get("/", httpGetUser);

module.exports = userRoute;
