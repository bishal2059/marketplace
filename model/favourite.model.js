const { usersModel } = require("./users.mongo");

const getFavourite = async function (id) {
  try {
    const favouriteProducts = await usersModel
      .findById(id, { favourites: 1, _id: 0 })
      .populate({ path: "favourites" });
    if (!favouriteProducts) return [];

    return favouriteProducts;
  } catch (err) {
    console.log(err.message);
    return {
      error: "Favourites Product isn't found",
    };
  }
};

const addToFavourite = async function (productId, userId) {
  try {
    return await usersModel.updateOne(
      { _id: userId },
      {
        $addToSet: {
          favourites: productId,
        },
      }
    );
  } catch (err) {
    console.log(err.message);
    throw Error("Couldn't add to the favourites (Invalid Product ID)");
  }
};

const removeFromFavourite = async function (productId, userId) {
  try {
    return await usersModel.updateOne(
      { _id: userId },
      {
        $pull: {
          favourites: productId,
        },
      }
    );
  } catch (err) {
    console.log(err.message);
    throw Error("Couldn't remove from the product (Invalid Product ID)");
  }
};

module.exports = {
  getFavourite,
  addToFavourite,
  removeFromFavourite,
};
