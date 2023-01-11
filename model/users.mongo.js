const mongoose = require("mongoose");
const validator = require("email-validator");

const { productsModel } = require("./product.mongo");

const validation = {
  validator: (v) => /^[a-zA-Z]+$/.test(v),
  message: (props) => `${props.value} isn't the correct firstName`,
};

const historySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  delivered: {
    type: Boolean,
    default: true,
  },
});

const usersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 30,
    validate: validation,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 30,
    validate: validation,
  },
  gender: {
    type: String,
    required: true,
    validate: {
      validator: (v) => v === "Male" || v === "Female",
      message: (props) => `${props.value} is't the correct gender`,
    },
  },
  age: {
    type: Number,
    required: true,
    min: 10,
    max: 100,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.validate(v),
      message: (props) => `${props.value} is invalid email`,
    },
  },
  phoneNo: {
    type: String,
    required: true,
    length: 10,
    validate: {
      validator: (v) => v.startsWith("98"),
      message: (props) => `${props.value} is invalid number`,
    },
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  favourites: {
    default: [],
    type: [mongoose.SchemaType.ObjectId],
    ref: "productsModel",
  },
  cart: {
    default: [],
    type: [mongoose.SchemaType.ObjectId],
    ref: "productsModel",
  },
  history: {
    default: [],
    type: [historySchema],
  },
  verified: {
    default: false,
    type: Boolean,
  },
});

const usersModel = mongoose.model("User", usersSchema);

module.exports = {
  usersModel,
};
