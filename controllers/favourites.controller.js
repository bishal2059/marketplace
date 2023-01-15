const jwt = require("jsonwebtoken");
const {
  getFavourite,
  addToFavourite,
  removeFromFavourite,
} = require("../model/favourite.model");

const httpGetFavouriteHandler = async function (req, res) {
  const { id } = res.locals;
  try {
    return res.status(200).json(await getFavourite(id));
  } catch (err) {
    console.log(err.message);
    return res.status(404).json(err.message);
  }
};
const httpAddFavouriteHandler = async function (req, res) {
  const { id: userId } = res.locals;
  const productId = req.body.id;
  if (!userId || !productId) {
    return res.status(404).json({ error: "Product id is not found" });
  }
  try {
    const data = await addToFavourite(productId, userId);
    if (data.modifiedCount === 1 && data.matchedCount === 1) {
      return res.status(201).json({ success: "Added to Favourite" });
    }
    if (data.modifiedCount === 0 && data.matchedCount === 1) {
      return res
        .status(400)
        .json({ error: "Product is already in Favourites" });
    }
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};
const httpRemoveFavouriteHandler = async function (req, res) {
  const { id: userId } = res.locals;
  const productId = req.params.id;
  if (!userId || !productId) {
    return res.status(404).json({ error: "Product id is not found" });
  }
  try {
    const data = await removeFromFavourite(productId, userId);
    if (data.modifiedCount === 1 && data.matchedCount === 1) {
      return res.status(201).json({ success: "Removed from Favourite" });
    }
    if (data.modifiedCount === 0 && data.matchedCount === 1) {
      return res.status(400).json({ error: "Product is not in Favourites" });
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  httpGetFavouriteHandler,
  httpAddFavouriteHandler,
  httpRemoveFavouriteHandler,
};
