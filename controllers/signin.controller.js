const { createNewUser } = require("../model/users.model");
const { signInDataVerification } = require("../services/signVerify");

const httpsignInHandler = async function (req, res) {
  const userData = req.body;
  if (!userData) {
    return res.status(400).json({ error: "Empty user data" });
  }
  try {
    await signInDataVerification(userData);
  } catch (err) {
    return res.status(400).json({ error: err });
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
