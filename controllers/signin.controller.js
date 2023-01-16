const { createNewUser } = require("../model/users.model");

const httpsignInHandler = async function (req, res) {
  const userData = req.body;
  if (!userData) {
    return res.status(400).json({ error: "Empty user data" });
  }
  if (
    !userData.hasOwnProperty("cpassword") ||
    userData.password !== userData.cpassword
  ) {
    return res.status(400).json({
      error: {
        cpassword: "Confirm password and password doesn't match",
      },
    });
  }
  try {
    const savedData = await createNewUser(userData);
    if (savedData.hasOwnProperty("error")) {
      return res.status(400).json(savedData);
    }
    return res.status(201).json({
      id: savedData._id,
      success: "User Created successfully",
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({
      error: err.message,
    });
  }
};

module.exports = {
  httpsignInHandler,
};
