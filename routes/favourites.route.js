const express = require("express");
const {
  httpGetFavouriteHandler,
  httpAddFavouriteHandler,
  httpRemoveFavouriteHandler,
} = require("../controllers/favourites.controller");

const favouriteRoute = express.Router();

favouriteRoute.get("/", httpGetFavouriteHandler);
favouriteRoute.post("/", httpAddFavouriteHandler);
favouriteRoute.delete("/:id", httpRemoveFavouriteHandler);

module.exports = favouriteRoute;
