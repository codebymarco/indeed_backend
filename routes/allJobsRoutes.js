const express = require('express')
const router = express.Router()
const {getAllJobs, searchJobs} = require('../controllers/allJobsController')


router.get('/', getAllJobs)

router.get('/search', searchJobs)



module.exports = router