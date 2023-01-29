const { getUserDetails } = require("../model/users.model");

const httpGetUser = async function (req, res) {
  const { id } = res.locals;
  try {
    const userDetails = await getUserDetails(id);
    if (userDetails?.error) {
      throw new Error("User not found");
    }
    return res.status(200).json(userDetails);
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ err: err.message });
  }
};

module.exports = {
  httpGetUser,
};
