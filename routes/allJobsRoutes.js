const express = require("express");
const router = express.Router();
const {
  getAllJobs,
  searchJobs,
  WriteReview,
  GetJob,
  GetEmployer,
  GetEmployee,
  GetReviews,
  GetJobTitlesAndCategories,
} = require("../controllers/allJobsController");

// router.get('/', getAllJobs)

// router.get('/search', searchJobs)

router.get("/", searchJobs);

router.get("/:id", GetJob);

router.get("/employer/portfolio/:id", GetEmployer);
router.get("/employee/portfolio/:id", GetEmployee);

router.post("/review", WriteReview);
router.get("/review/:id", GetReviews);

router.get("/suggestions/search", GetJobTitlesAndCategories);


module.exports = router;
