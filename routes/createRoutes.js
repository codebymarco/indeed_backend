const express = require("express");
const router = express.Router();
const {
  create,
} = require("../controllers/allJobsController");

router.get("/", create);

module.exports = router;
