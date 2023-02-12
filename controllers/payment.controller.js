const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { productsModel } = require("../model/products.mongo");
const { usersModel } = require("../model/users.mongo");

const httpPaymentHandler = async function (req, res) {
  console.log(req.body);
  const { id } = res.locals;
  const { productID, token } = req.body;

  const product = await productsModel.findById(productID);
  const user = await usersModel.findById(id);
  try {
    if (!product) throw new Error("Product not Found");
    if (!user) throw new Error("User not found");
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: "Payment Failed" });
  }

  const productPrice = (
    ((100 - product.discountPercentage) / 100) *
    product.price
  ).toFixed(2);
  return stripe.customers
    .create({
      email: token.email,
    })
    .then(() => {
      return stripe.charges.create({
        amount: Number(productPrice).toFixed(2) * 100,
        currency: "usd",
        source: token.id,
        description: `${token.card.name} purchased ${product.name}  at ${productPrice}`,
        receipt_email: token.email,
        shipping: {
          name: token.card.name,
          address: { country: token.card.address_country },
        },
      });
    })
    .then(() => {
      updateProduct(productID);
      addToHistory(productID, id);
      res.status(200).json({ success: "Payment Successful" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Payment failed" });
    });
};

const updateProduct = async function (id) {
  const { stock } = await productsModel.findById(id);
  await productsModel.findOneAndUpdate({ _id: id }, { stock: stock - 1 });
  if (stock <= 1) {
    await productsModel.findByIdAndDelete(id);
  }
};

const addToHistory = async function (productId, userId) {
  try {
    return await usersModel.updateOne(
      { _id: userId },
      {
        $addToSet: {
          history: productId,
        },
      }
    );
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { httpPaymentHandler };
