const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const loginRoute = require("./routes/login.route");
const productsRoute = require("./routes/products.route");
const signInRoute = require("./routes/signin.route");
const favouriteRoute = require("./routes/favourites.route");
const cartRoute = require("./routes/cart.route");
const { authenticateUser } = require("./middleware/auth.middleware");
const verificationRouter = require("./routes/verification.route");
const logoutRoute = require("./routes/logout.route");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(morgan("combined"));

app.use(cookieParser());
app.use(express.json());

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error(err);
    return res.status(400).json({ status: 400, message: err.message });
  }
  next();
});

app.use("/products", authenticateUser, productsRoute);
app.use("/signin", signInRoute);
app.use("/login", loginRoute);
app.use("/favourites", authenticateUser, favouriteRoute);
app.use("/cart", authenticateUser, cartRoute);
app.use("/verify", verificationRouter);
app.use("/logout", authenticateUser, logoutRoute);

app.all("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

module.exports = app;
