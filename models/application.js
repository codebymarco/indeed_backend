const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const applicationSchema = new Schema(
  {
    job_id: {
      type: String,
      required: true,
    },
    job_title: {
      type: String,
      required: true,
    },
    applicant_name: {
      type: String,
    },
    applicant_email: {
      type: String,
      required: true,
    },
    resume_link: {
      type: String,
      required: true,
    },
    portfolio_link: {
      type: String,
      required: true,
    },
    rejected: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("application", applicationSchema);
