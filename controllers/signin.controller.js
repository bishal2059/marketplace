const { createNewUser } = require("../model/users.model");

const httpsignInHandler = async function (req, res) {
  const userData = req.body;
  if (!userData) return res.status(400).json({ error: "Empty user data" });
  try {
    const saveddata = await createNewUser(userData);
    return res.status(201).json(saveddata);
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
