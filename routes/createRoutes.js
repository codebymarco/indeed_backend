const express = require("express");
const router = express.Router();
const {
  createMultipleCompanies,
} = require("../controllers/createController");

router.get("/", createMultipleCompanies);

module.exports = router;
