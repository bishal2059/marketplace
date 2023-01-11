const { productsModel } = require("./product.mongo");

const getAllProducts = async function () {
  try {
    return await productsModel.find(
      {},
      {
        _id: 0,
      }
    );
  } catch (err) {
    return {
      error: "Products couldn't be found",
    };
  }
};

module.exports = {
  getAllProducts,
};
