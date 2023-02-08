const express = require("express");
const { httpGetHistoryHandler } = require("../controllers/history.controller");

const historyRoute = express.Router();

historyRoute.get("/", httpGetHistoryHandler);

module.exports = historyRoute;
