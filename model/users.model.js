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

const createNewUser = async function (userData) {
  try {
    const newUserName = await usersModel.find({ userName: userData.userName });
    const newEmail = await usersModel.find({ email: userData.email });
    if (newUserName.length || newEmail.length) {
      throw new Error("User Already exists");
    }
    await usersModel.create(userData);
    return await usersModel.findOne(
      { email: userData.email, userName: userData.userName },
      {
        _id: 0,
        __v: 0,
      }
    );
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};

module.exports = { getUser, createNewUser };
