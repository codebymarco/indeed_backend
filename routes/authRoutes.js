const express = require("express");
const {
  loginEmployee,
  loginEmployer,
  createEmployee,
  createEmployer,
} = require("../controllers/authController");
const router = express.Router();

//login
router.post("/employee/login", loginEmployee);

//login
router.post("/employer/login", loginEmployer);

router.post("/employee/create", createEmployee);

//signin user
router.post("/employer/create", createEmployer);

module.exports = router;
