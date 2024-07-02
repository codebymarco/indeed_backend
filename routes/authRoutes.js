const express = require('express')
const router = express.Router()
const {createUser, loginUser, createEmployer, loginEmployer} = require('../controllers/authController')


//login user
router.post('/employee/login', loginUser)

//signin user
router.post('/employee/create', createUser)

router.post('/employer/login', loginEmployer)

//signin user
router.post('/employer/create', createEmployer)


module.exports = router