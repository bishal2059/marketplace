const { getAllProducts } = require("../model/products.model");

const httpProductsHandler = async function (req, res) {
  return res.status(200).json(await getAllProducts());
};

module.exports = { httpProductsHandler };
