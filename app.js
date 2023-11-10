const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const loginRoute = require("./routes/login.route");
const productsRoute = require("./routes/products.route");
const signInRoute = require("./routes/signin.route");
const favouriteRoute = require("./routes/favourites.route");
const cartRoute = require("./routes/cart.route");
const { authenticateUser } = require("./middleware/auth.middleware");
const verificationRouter = require("./routes/verification.route");
const logoutRoute = require("./routes/logout.route");
const userRoute = require("./routes/user.route");
const paymentHandler = require("./routes/payment");
const historyRoute = require("./routes/history.route");

const app = express();

app.set("trust proxy", 1);

app.use(
  cors({
    origin: [process.env.FRONT_END_URL],
    credentials: true,
    methods: ["POST", "PUT", "GET", "DELETE"],
    exposedHeaders: ["set-cookie"],
  })
);

app.use(morgan("combined"));

app.use(cookieParser());
app.use(express.json());

//CORS-cookie Headers
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONT_END_URL);
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, *");
  res.next();
});

app.use("/", express.static(path.join(__dirname, "public")));

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
app.use("/user", authenticateUser, userRoute);
app.use("/payment", authenticateUser, paymentHandler);
app.use("/history", authenticateUser, historyRoute);

app.all("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

module.exports = app;
