const express = require("express");

const { httpPaymentHandler } = require("../controllers/payment.controller");

const paymentHandler = express.Router();

paymentHandler.post("/", httpPaymentHandler);

module.exports = paymentHandler;
