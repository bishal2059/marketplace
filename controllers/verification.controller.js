const nodemailer = require("nodemailer");
const { usersModel } = require("../model/users.mongo");
const { createAccessToken } = require("../services/jwt.token");

const createTransporter = async function () {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.HOST_ID,
      pass: process.env.HOST_PASS,
    },
  });
};

const httpVerificationHandler = async function (req, res) {
  const { id } = res.locals;
  const user = await usersModel.findById(id, { verified: 1, email: 1, _id: 0 });
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }
  if (!("verified" in user) || !("email" in user)) {
    return res.status(400).json({ error: "User not found" });
  }
  if (user.verified) {
    return res.status(400).json({ error: "User already verified" });
  }
  const transporter = await createTransporter();
  const accessToken = await createAccessToken(id);
  const verificationLink = `${process.env.API_URL}/verify/${accessToken}`;
  const mailDetails = {
    from: process.env.HOST_ID,
    to: user.email,
    subject: "Verify your email address for marketplace",
    html: `<p>Welcome back,<br/> Please click on the link below to verify your email address to MARKETPLACE:<br/> <a href="${verificationLink}">${verificationLink}</a></p>`,
  };
  transporter.sendMail(mailDetails, (err) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json({
        error: "Verification email couldn't be sent. Please try again later",
      });
    } else {
      return res.status(200).json({ success: "Verfication email sent" });
    }
  });
};

const httpEmailVerificationHandler = async function (req, res) {
  const { id } = res.locals;
  try {
    const user = await usersModel.findOneAndUpdate(
      { _id: id },
      { $set: { verified: true } }
    );
    res.status(200).send("Congratulation!. Your account is now verified");
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .send(
        `Your account couldn't be verified. Please Try again later ${err.message}`
      );
  }
};

module.exports = {
  httpVerificationHandler,
  httpEmailVerificationHandler,
};
