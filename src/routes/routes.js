const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../config/.env") });
const router = require("express").Router();
const axios = require("axios");
const moment = require("moment"); // required for getting time and date
const gmailTransporter = require("../email/email.js");
const reviews = require("../utils/reviews");
const Crypto = require("crypto");
let randomChar;

router.get("/", async (req, res) => {
  res.render("home", { reviews });
});
router.get("/reviews", (req, res) => {
  res.send(reviews);
});

router.get("/timeDate", (req, res) => {
  const dateTime = moment().format("[©]YYYY. [Time: ]h:mm:ss A");
  res.send(dateTime);
});

router.get("/news", async (req, res) => {
  const randomNum = Math.floor(Math.random() * 100);
  const url = `http://api.mediastack.com/v1/news?access_key=${process.env.NEWS_API_KEY}&offset=${randomNum}&limit=12&languages=en`;
  try {
    const news = await axios.get(url);
    const newsData = news.data.data;
    res.render("news", {newsData});
  } catch (error) {
    console.log(error);
  }

});

router.get("/contact", async (req, res) => {
  randomChar = Crypto.randomBytes(21).toString("base64").slice(0, 5);
  res.render("contact", { randomChar });
});

router.get("/motivation", async (req, res) => {
  const url = "https://zenquotes.io/api/quotes/";
  try {
    const news = await axios.get(url);
    const newsData = news.data;
    res.send(newsData);
  } catch (error) {
    console.log(error);
  }
});

router.post("/contact", async (req, res) => {
  const { transporter, mailOptions } = gmailTransporter(req.body);
  if (req.body.iAmHumanCalculation.trim() === randomChar) {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.render("emailFailure", { senderName: req.body.name });
      } else {
        console.log("Email sent: " + info.response);
        res.render("emailSuccess", { senderName: req.body.name });
      }
    });
  } else {
    res.render("emailFailure", { senderName: req.body.name });
  }
});
module.exports = router;
