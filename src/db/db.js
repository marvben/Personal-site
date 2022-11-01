const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../config/.env") });
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGOD_DB_STRING);
}

const reviewSchema = new mongoose.Schema(
  {
    name: String,
    companyName: String,
    review: String,
    rating: Number,
    siteUrl: String,
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
