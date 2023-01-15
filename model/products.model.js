const axios = require("axios");
const { productsModel } = require("./products.mongo");

const getAllProducts = async function (limitedPage, filter) {
  let filterObject = {};
  if (filter) {
    const filterString = filter.replaceAll("%", " ");
    filterObject = {
      $or: [
        { name: new RegExp(`${filterString}`, "i") },
        { brand: new RegExp(`${filterString}`, "i") },
        { category: new RegExp(`${filterString}`, "i") },
      ],
    };
  }
  try {
    return await productsModel
      .find(filterObject, { __v: 0 })
      .sort()
      .skip(limitedPage.skip)
      .limit(limitedPage.limit);
  } catch (err) {
    return {
      error: "Products couldn't be found",
    };
  }
};

const getProduct = async function (limitedPage, category) {
  try {
    return await productsModel
      .find({ category: `${category}` }, { __v: 0 })
      .sort()
      .skip(limitedPage.skip)
      .limit(limitedPage.limit);
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
      // prettier-ignore
      const { title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images,
      } = data;
      // prettier-ignore
      await saveProducts({
        name: title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images,
      });
    });
  } catch (err) {
    console.log(err.message);
    console.log("External API connection failed");
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  storeAllProducts,
};
