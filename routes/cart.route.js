const express = require("express");
const {
  httpGetCart,
  httpAddToCart,
  httpRemoveFromCart,
} = require("../controllers/cart.controller");
const { verifyUser } = require("../middleware/verify.middleware");

const cartRoute = express.Router();

cartRoute.use(verifyUser);

cartRoute.get("/", httpGetCart);
cartRoute.post("/", httpAddToCart);
cartRoute.delete("/:id", httpRemoveFromCart);

module.exports = cartRoute;
