const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    employer_id: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("review", reviewSchema);
