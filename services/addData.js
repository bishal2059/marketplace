const { usersModel } = require("../model/users.mongo");

const addData = async function (products, userId) {
  let userFav;
  try {
    const fav = await usersModel.findById(userId, { favourites: 1, _id: 0 });
    userFav = fav.favourites;
  } catch (err) {
    console.log(err.message);
    userFav = [];
  }
  const addedFav = products.map((ele) => {
    const data = {
      _id: ele._id,
      name: ele.name,
      brand: ele.brand,
      category: ele.category,
      description: ele.description,
      discountPercentage: ele.discountPercentage,
      images: ele.images,
      price: ele.price,
      rating: ele.rating,
      stock: ele.stock,
      thumbnail: ele.thumbnail,
    };
    if (userFav.includes(ele._id)) {
      return Object.assign(data, { favourite: true });
    } else {
      return Object.assign(data, { favourite: false });
    }
  });
  return addedFav;
};

module.exports = { addData };
