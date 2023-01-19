const { usersModel } = require("../model/users.mongo");

const httpLogoutHandler = async function (req, res) {
  const { id } = res.locals;
  try {
    const user = await usersModel.findById(id, { email: 1 });
    if (user) {
      res.cookie("jwt", "", {
        httpOnly: true,
        maxAge: 1,
      });
      res.cookie("rjwt", "", {
        httpOnly: true,
        maxAge: 1,
      });
      return res.status(200).json({ success: "Logout successful" });
    } else {
      return res.status(500).json({ error: "User not found" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ err: "Logout failed" });
  }
};

module.exports = {
  httpLogoutHandler,
};
