const { addData } = require("../services/addData");
const { usersModel } = require("./users.mongo");

const getCart = async function (id) {
  try {
    const cartProducts = await usersModel
      .findById(id, { cart: 1, _id: 0 })
      .populate({ path: "cart" });
    if (!cartProducts) return [];

    return await addData(cartProducts.cart, id);
  } catch (err) {
    console.log(err.message);
    return {
      error: "Cart Product isn't found",
    };
  }
};

const addToCart = async function (productId, userId) {
  try {
    return await usersModel.updateOne(
      { _id: userId },
      {
        $addToSet: {
          cart: productId,
        },
      }
    );
  } catch (err) {
    console.log(err.message);
    throw Error("Couldn't add to the cart (Invalid Product ID)");
  }
};

const removeFromCart = async function (productId, userId) {
  try {
    return await usersModel.updateOne(
      { _id: userId },
      {
        $pull: {
          cart: productId,
        },
      }
    );
  } catch (err) {
    console.log(err.message);
    throw Error("Couldn't remove from the cart (Invalid Product ID)");
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
};
