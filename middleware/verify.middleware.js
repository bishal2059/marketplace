const { usersModel } = require("../model/users.mongo");

const verifyUser = async function (req, res, next) {
  const { id } = res.locals;
  if (!id) {
    return res.status(400).json({ error: "Invalid User Id" });
  }

  const user = await usersModel.findById(id, { verified: 1, _id: 0 });
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }
  if (!user.verified) {
    return res.status(400).json({ error: "User not verified" });
  }

  next();
};

module.exports = {
  verifyUser,
};
