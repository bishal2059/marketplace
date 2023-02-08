const { getHistory } = require("../model/history.model");

const httpGetHistoryHandler = async function (req, res) {
  const { id } = res.locals;
  try {
    return res.status(200).json(await getHistory(id));
  } catch (err) {
    console.log(err.message);
    return res.status(404).json(err.message);
  }
};

module.exports = {
  httpGetHistoryHandler,
};
