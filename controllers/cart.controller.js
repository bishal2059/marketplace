const { getCart, addToCart, removeFromCart } = require("../model/cart.model");

const httpGetCart = async function (req, res) {
  const { id } = res.locals;
  try {
    return res.status(200).json(await getCart(id));
  } catch (err) {
    console.log(err.message);
    return res.status(404).json(err.message);
  }
};
const httpAddToCart = async function (req, res) {
  const { id: userId } = res.locals;
  const productId = req.body.id;
  if (!userId || !productId) {
    return res.status(404).json({ error: "Product id is not found" });
  }
  try {
    const data = await addToCart(productId, userId);
    if (data.modifiedCount === 1 && data.matchedCount === 1) {
      return res.status(201).json({ success: "Added to Cart" });
    }
    if (data.modifiedCount === 0 && data.matchedCount === 1) {
      return res.status(400).json({ error: "Product is already in Cart" });
    }
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};
const httpRemoveFromCart = async function (req, res) {
  const { id: userId } = res.locals;
  const productId = req.params.id;
  if (!userId || !productId) {
    return res.status(404).json({ error: "Product id is not found" });
  }
  try {
    const data = await removeFromCart(productId, userId);
    if (data.modifiedCount === 1 && data.matchedCount === 1) {
      return res.status(201).json({ success: "Removed from Cart" });
    }
    if (data.modifiedCount === 0 && data.matchedCount === 1) {
      return res.status(400).json({ error: "Product is not in Cart" });
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  httpGetCart,
  httpAddToCart,
  httpRemoveFromCart,
};
