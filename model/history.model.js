const { usersModel } = require("./users.mongo");

const getHistory = async function (id) {
  try {
    const historyProducts = await usersModel
      .findById(id, { history: 1, _id: 0 })
      .populate({ path: "history" });
    if (!historyProducts) return [];

    return historyProducts.history;
  } catch (err) {
    console.log(err.message);
    return {
      error: "Favourites Product isn't found",
    };
  }
};

module.exports = {
  getHistory,
};
