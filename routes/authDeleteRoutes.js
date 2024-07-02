const express = require('express')
const router = express.Router()
const {deleteEmployer} = require('../controllers/authController')

const EmployerAuth = require('../middlewear/requireEmployerAuth')
router.use(EmployerAuth)



//delete employer
router.delete('/employer', deleteEmployer)


module.exports = router