const express = require("express");

const {
  httpProductsHandler,
  httpProductHandler,
} = require("../controllers/products.controller");

const productsRoute = express.Router();

productsRoute.get("/", httpProductsHandler);
productsRoute.get("/:category", httpProductHandler);

module.exports = productsRoute;
