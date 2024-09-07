const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const resumeSchema = new Schema(
  {
    photo: {
      type: String,
    },
    user_id: {
      type: String,
      required: true,
    },
    deleted: {
      type: Boolean,
    },
    mimetype: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("resume", resumeSchema);
