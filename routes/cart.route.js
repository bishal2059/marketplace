const express = require("express");

const cartRoute = express.Router();

cartRoute.get("/");
cartRoute.post("/");

module.exports = cartRoute;
