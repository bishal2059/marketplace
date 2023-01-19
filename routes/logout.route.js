const express = require("express");
const { httpLogoutHandler } = require("../controllers/logout.controller");

const logoutRoute = express.Router();

logoutRoute.get("/", httpLogoutHandler);

module.exports = logoutRoute;
