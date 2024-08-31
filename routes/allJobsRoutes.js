const express = require('express')
const router = express.Router()
const {getAllJobs, searchJobs} = require('../controllers/allJobsController')


router.get('/', getAllJobs)

router.get('/search', searchJobs)

// todo
// put the sreahc query in the same one as the /
// because if u use http://localhost:5000/api/jobs/search?location=all&query=all or http://localhost:5000/api/jobs?page=1
// it gives the same result



module.exports = router