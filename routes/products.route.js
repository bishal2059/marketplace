const express = require("express");

const { httpProductsHandler } = require("../controllers/products.controller");

const productsRoute = express.Router();

productsRoute.get("/", httpProductsHandler);

module.exports = productsRoute;
