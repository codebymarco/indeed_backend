const express = require("express");
const router = express.Router();

const EmployerAuth = require("../middlewear/requireEmployerAuth");

router.use(EmployerAuth);

//get single employer
// router.get('/getOne', getSingleEmployer )

module.exports = router;
