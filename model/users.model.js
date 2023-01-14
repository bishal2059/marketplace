const { usersModel } = require("./users.mongo");

const getUser = async function (userData) {
  try {
    const user = await usersModel.findOne(
      {
        email: userData.email,
        password: userData.password,
      },
      { _id: 0, __v: 0 }
    );
    if (!user) {
      throw new Error("Access denied");
    }
    return user;
  } catch (err) {
    console.log(err.message);
    return {
      error: "Access denied",
    };
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
    if (err.message.includes("Cast to [date] failed")) {
      errorObject[
        err.errors?.["dateOfBirth.0"]?.reason?.path
      ] = `${err.errors?.["dateOfBirth.0"]?.reason?.value} isn't correct DOB`;
    }
    Object.values(err.errors).forEach(({ properties }) => {
      errorObject[properties?.path] = properties?.message;
    });
  }
  return errorObject;
};

const createNewUser = async function (userData) {
  try {
    return await usersModel.create(userData);
  } catch (err) {
    console.log(err.message);
    return {
      errors: await errorHandler(err),
    };
  }
};

module.exports = { getUser, createNewUser };
