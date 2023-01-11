const mongoose = require("mongoose");

const MONGO_URL = "mongodb://127.0.0.1:27017/shop";

mongoose.set("strictQuery", false);

mongoose.connection.on("start", () => {});

const connectToDB = async function () {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to the database");
  } catch (err) {
    console.error(`connection to database failed ${err}`);
  }
};

const disconnectToDB = async function () {
  try {
    await mongoose.disconnect();
  } catch (err) {
    console.error(`Database disconnection failed ${err}`);
  }
};

module.exports = {
  connectToDB,
  disconnectToDB,
};
