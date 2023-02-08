const axios = require("axios");
const { addData } = require("../services/addData");
const { productsModel } = require("./products.mongo");

const serachLogic = function (filter) {
  if (!filter) return {};
  const searchWord = filter
    .split(" ")
    .map((v) => v.replaceAll(/[^a-z0-9]/gi, ""));
  return {
    $or: searchWord
      .map((e) => {
        return [
          { name: new RegExp(`${e}`, "i") },
          { brand: new RegExp(`${e}`, "i") },
          { category: new RegExp(`${e}`, "i") },
        ];
      })
      .flat(),
  };
};

const getAllProducts = async function (limitedPage, filter, id) {
  const filterObject = serachLogic(filter);
  try {
    const allProducts = {};
    allProducts.products = await productsModel
      .find(filterObject, { __v: 0 })
      .sort()
      .skip(limitedPage.skip)
      .limit(limitedPage.limit);
    allProducts.products = await addData(allProducts.products, id);
    const totalCount = await productsModel.find(filterObject).count();
    if (limitedPage.skip === 0) {
      allProducts.previous = false;
    } else {
      allProducts.previous = true;
    }
    if (limitedPage.skip + limitedPage.limit >= totalCount) {
      allProducts.next = false;
    } else {
      allProducts.next = true;
    }
    return allProducts;
  } catch (err) {
    return {
      error: "Products couldn't be found",
    };
  }
};

const getProduct = async function (limitedPage, category, filter, id) {
  const filterObject = serachLogic(filter);
  try {
    const allProducts = {};
    const products = await productsModel
      .find(Object.assign({ category: `${category}` }, filterObject), {
        __v: 0,
      })
      .sort()
      .skip(limitedPage.skip)
      .limit(limitedPage.limit);
    allProducts.products = await addData(products, id);
    const totalCount = await productsModel
      .find({ category: `${category}` })
      .count();
    if (limitedPage.skip === 0) {
      allProducts.previous = false;
    } else {
      allProducts.previous = true;
    }
    if (limitedPage.skip + limitedPage.limit >= totalCount) {
      allProducts.next = false;
    } else {
      allProducts.next = true;
    }
    return allProducts;
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
    const isThereData = await productsModel.count();
    if (isThereData >= 100) {
      console.log("Products data already loaded!");
      return;
    }
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
