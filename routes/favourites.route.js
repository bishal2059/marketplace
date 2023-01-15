const express = require("express");

const favouriteRoute = express.Router();

favouriteRoute.get("/");
favouriteRoute.post("/");

module.exports = favouriteRoute;
