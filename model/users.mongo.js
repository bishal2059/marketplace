const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const { productsModel } = require("./products.mongo");

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
    required: [true, "First Name is required"],
    minLength: [1, "Minimum length is 1"],
    maxLength: [30, "Maximum length is 30"],
    validate: validation,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    minLength: [1, "Minimum length is 1"],
    maxLength: [30, "Maximum length is 30"],
    validate: validation,
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
    validate: {
      validator: (v) => v === "Male" || v === "Female",
      message: (props) => `${props.value} is't the correct gender`,
    },
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
    min: [10, "Minimum required age is 10"],
    max: [100, "Maximum possible age is 100"],
    validate: {
      validator: (v) => Boolean(Number(v)),
      message: (props) => `${props} is not a valid age`,
    },
  },
  dateOfBirth: {
    type: [Date, "Date of birth should be in correct format"],
    required: [true, "Date of Birth is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: (props) => `${props.value} is invalid email`,
    },
  },
  phoneNo: {
    type: String,
    required: true,
    length: [10, "It is not a valid phone number"],
    unique: true,
    validate: {
      validator: (v) => v.startsWith("98"),
      message: (props) => `${props.value} is invalid number`,
    },
  },
  userName: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  password: {
    type: String,
    minLength: [7, "Minimum password length is 7"],
    required: [true, "Password is required"],
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

usersSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  const salt1 = await bcrypt.genSalt();
  const salt2 = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  this.userName = await bcrypt.hash(this.userName, salt1);
  this.phoneNo = await bcrypt.hash(this.phoneNo, salt2);
  next();
});

const usersModel = mongoose.model("User", usersSchema);

module.exports = {
  usersModel,
};
