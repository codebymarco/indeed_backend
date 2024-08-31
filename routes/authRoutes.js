const express = require("express");
const {
  loginEmployee,
  loginEmployer,
  createEmployee,
  createEmployer,
} = require("../controllers/authController");
const router = express.Router();

//login
router.post("/employee/login", loginEmployee); // postman

//login
router.post("/employer/login", loginEmployer); // postman

router.post("/employee/create", createEmployee); // postman 

//signin user
router.post("/employer/create", createEmployer); // postman

module.exports = router;
