const express = require("express");
const { httploginHandler } = require("../controllers/login.controller");

const loginRoute = express.Router();

loginRoute.post("/", httploginHandler);

module.exports = loginRoute;
