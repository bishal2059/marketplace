const express = require("express");
const loginRoute = require("./routes/login.route");
const productsRoute = require("./routes/products.route");
const signInRoute = require("./routes/signin.route");

const app = express();

app.use(express.json());

app.use("/products", productsRoute);
app.use("/signin", signInRoute);
app.use("/login", loginRoute);

module.exports = app;
