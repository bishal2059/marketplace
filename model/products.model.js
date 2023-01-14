const axios = require("axios");
const { productsModel } = require("./products.mongo");

const getAllProducts = async function () {
  try {
    return await productsModel.find({}, { __v: 0 });
  } catch (err) {
    return {
      error: "Products couldn't be found",
    };
  }
};

const saveProducts = async function (data) {
  try {
    await productsModel.findOneAndUpdate({ name: data.name }, data, {
      upsert: true,
    });
  } catch (err) {
    console.log(err.message);
  }
};

const storeAllProducts = async function () {
  try {
    const data = await axios.get("https://dummyjson.com/products/1");
    const firstData = await productsModel.find({ name: data.data.title });
    if (firstData.length > 0) {
      console.log("Products data already loaded!");
      return;
    }
    const allProducts = await axios.get(
      "https://dummyjson.com/products?limit=100"
    );
    allProducts.data["products"].forEach(async (data) => {
      const {
        title,
        description,
        price,
        discountPercentage,
        rating,
        stock,
        brand,
        category,
        thumbnail,
        images,
      } = data;
      await saveProducts({
        name: title,
        description,
        price,
        discountPercentage,
        rating,
        stock,
        brand,
        category,
        thumbnail,
        images,
      });
    });
  } catch (err) {
    console.log(err.message);
    console.log("External API connection failed");
  }
};

module.exports = {
  getAllProducts,
  storeAllProducts,
};
