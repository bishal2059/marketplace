const { usersModel } = require("./users.mongo");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const getUser = async function (email, password) {
  try {
    if (!isEmail(email)) throw Error("Invalid Email");
    const user = await usersModel.findOne({ email }, { __v: 0 });
    if (!user) throw Error("Email is not registered");
    if (user) {
      const authUser = await bcrypt.compare(password, user.password);
      if (authUser) {
        return user;
      }
      throw Error("Incorrect password");
    }
  } catch (err) {
    throw Error(err.message);
  }
};

const errorHandler = async function (err) {
  const errorObject = {};
  // console.log(err.code);
  if (err.code === 11000) {
    Object.keys(err.keyValue).forEach((v) => {
      errorObject[v] = `${err.keyValue[v]} is already registered`;
    });
  }
  if (err._message === "User validation failed") {
    if (err.message.includes("Cast to Number failed")) {
      errorObject[
        err.errors?.age?.path
      ] = `${err.errors?.age?.value} isn't correct age`;
    }
    if (err.message.includes("Cast to date failed")) {
      console.log(err.errors);
      errorObject[
        err.errors?.dateOfBirth?.path
      ] = `${err.errors?.dateOfBirth?.value} isn't correct DOB`;
    }
    Object.values(err.errors).forEach(({ properties }) => {
      errorObject[properties?.path] = properties?.message;
    });
  }
  return errorObject;
};

const createNewUser = async function (userData) {
  try {
    // prettier-ignore
    const { firstName, lastName, age, gender, dateOfBirth, email, phoneNo,userName, password} = userData;
    // prettier-ignore
    return await usersModel.create({ firstName, lastName, age, gender, dateOfBirth, email, phoneNo, userName, password});
  } catch (err) {
    console.log(err.message);
    return {
      error: await errorHandler(err),
    };
  }
};

module.exports = { getUser, createNewUser };
