const express = require('express')
const router = express.Router()
const {createJob, getJobsSingleEmployer, getSingleJob, deleteJob} = require('../controllers/jobController')

const EmployerAuth = require('../middlewear/requireEmployerAuth')
router.use(EmployerAuth)



//create a job
router.post('/create', createJob)

//get jobs for a single employer
router.get('/getJobSingleEmployer', getJobsSingleEmployer)


//get single job for an employer
router.get('/job/:id', getSingleJob)

//delete job for an employer
router.delete('/job/delete/:id', deleteJob)


module.exports = router