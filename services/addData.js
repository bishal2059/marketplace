const { usersModel } = require("../model/users.mongo");

const addData = async function (products, userId) {
  let userFav, userCart;
  try {
    const fav = await usersModel.findById(userId, {
      favourites: 1,
      cart: 1,
      _id: 0,
    });
    userFav = fav.favourites;
    userCart = fav.cart;
  } catch (err) {
    console.log(err.message);
    userFav = userCart = [];
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
    if (userFav.includes(ele._id) && userCart.includes(ele._id)) {
      return Object.assign(data, { favourite: true, cart: true });
    } else if (userFav.includes(ele._id) && !userCart.includes(ele._id)) {
      return Object.assign(data, { favourite: true, cart: false });
    } else if (!userFav.includes(ele._id) && userCart.includes(ele._id)) {
      return Object.assign(data, { favourite: false, cart: true });
    } else {
      return Object.assign(data, { favourite: false, cart: false });
    }
  });
  return addedFav;
};

module.exports = { addData };
