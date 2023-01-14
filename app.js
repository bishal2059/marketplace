const express = require("express");
const loginRoute = require("./routes/login.route");
const productsRoute = require("./routes/products.route");
const signInRoute = require("./routes/signin.route");

const app = express();

app.use(express.json());

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error(err);
    return res.status(400).json({ status: 400, message: err.message });
  }
  next();
});

app.use("/products", productsRoute);
app.use("/signin", signInRoute);
app.use("/login", loginRoute);

module.exports = app;
