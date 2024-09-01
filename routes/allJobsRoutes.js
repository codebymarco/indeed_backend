const express = require('express')
const router = express.Router()
const {getAllJobs, searchJobs, WriteReview} = require('../controllers/allJobsController')


// router.get('/', getAllJobs)

// router.get('/search', searchJobs)

router.get('/', searchJobs)


router.post('/review', WriteReview)


// todo
// put the sreahc query in the same one as the /
// because if u use http://localhost:5000/api/jobs/search?location=all&query=all or http://localhost:5000/api/jobs?page=1
// it gives the same result



module.exports = router