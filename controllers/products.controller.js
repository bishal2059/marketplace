const { getAllProducts, getProduct } = require("../model/products.model");
const { getPagination } = require("../services/pagination");

const httpProductsHandler = async function (req, res) {
  const { id } = res.locals;
  const limitedPage = getPagination(req.query);
  return res
    .status(200)
    .json(await getAllProducts(limitedPage, req.query?.name, id));
};

const httpProductHandler = async function (req, res) {
  const limitedPage = getPagination(req.query);
  const { id } = res.locals;
  return res
    .status(200)
    .json(
      await getProduct(limitedPage, req.params.category, req.query?.name, id)
    );
};

module.exports = { httpProductsHandler, httpProductHandler };
