const { getUser } = require("../model/users.model");

const httploginHandler = async function (req, res) {
  const userData = req.body;
  try {
    const authorizedUser = await getUser(userData);
    // console.log(authorizedUser);
    return res.status(200).json(authorizedUser);
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({
      error: err.message,
    });
  }
};

module.exports = {
  httploginHandler,
};
