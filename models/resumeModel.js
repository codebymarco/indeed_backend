const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const resumeSchema = new Schema(
  {
    path: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    mimetype: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("resumeModel", resumeSchema);
