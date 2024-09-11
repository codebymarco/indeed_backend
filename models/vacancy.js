const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const jobSchema = new Schema(
  {
    company_id: {
      type: String,
      required: true,
    },
    company_name: {
      type: String,
    },
    location: {
      type: Array,
    },
    reciever_email: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    salary: {
      type: String,
    },
    requirements: {
      type: Array,
    },
    responsibilities: {
      type: Array,
    },
    work_type: {
      type: String,
    },
    employment_type: {
      type: String,
    },
    categories: {
      type: Array,
    },
    active: {
      type: Boolean,
    },
    views: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("job", jobSchema);
