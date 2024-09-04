const express = require('express')
const router = express.Router()
const {getAllJobs, searchJobs, WriteReview, GetJob} = require('../controllers/allJobsController')


// router.get('/', getAllJobs)

// router.get('/search', searchJobs)

router.get('/', searchJobs)

router.get('/:id', GetJob)


router.post('/review', WriteReview)

module.exports = router