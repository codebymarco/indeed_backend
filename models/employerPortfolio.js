const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const companyPortfolioSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    name: {
      type: String,
    },
    location: {
      type: Array,
    },
    locationHierarchy: {
      type: Array,
    },
    work_force: {
      type: String,
    },
    website: {
      type: String,
    },
    hr_emails: {
      type: Array,
    },
    contact_no: {
      type: Array,
    },
    active: {
      type: Boolean,
    },
    recruiter_type: {
      type: String,
    },
    views: {
      type: Number,
      required: true,
    },
    mimetype: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("companyPortfolio", companyPortfolioSchema);
