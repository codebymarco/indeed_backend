const express = require("express");
const router = express.Router();
const uploadPhoto = require("../middlewear/uploadPhotoMiddlewear");

const EmployerAuth = require("../middlewear/requireEmployerAuth");

const {
  GetPortfolio,
  EditPortfolio,
  EmployerDeleteEmployer,
  employerChangePasswordEmployer,
  employerCheckPasswordEmployer,
  EmployerCreateJob,
  EmployerGetVacancies,
  EmployerGetVacancy,
  EmployerGetApplicants,
  EmployerEditVacancy,
  EmployerDeleteVacancy,
  EmployerEditApplicant,
  EditPortfolioPhoto,
  GetStats,
} = require("../controllers/employerController");

router.use(EmployerAuth);

// Account Routes
router.delete("/account", EmployerDeleteEmployer);
router.post("/account/password/check", employerCheckPasswordEmployer);
router.post("/account/password/change", employerChangePasswordEmployer);

// Application Routes
router.put("/application/:id", EmployerEditApplicant);
router.get("/application", EmployerGetApplicants);

// Portfolio Routes
router.put("/portfolio", EditPortfolio); // postman
router.get("/portfolio", GetPortfolio); // postman
router.put("/portfolio/photo", uploadPhoto.single("photo"), EditPortfolioPhoto);

// Job Routes
router.delete("/job/:id", EmployerDeleteVacancy); // postman
router.get("/job", EmployerGetVacancies); // postman
router.get("/job/:id", EmployerGetVacancy); // postman
router.post("/job", EmployerCreateJob); // postman
router.put("/job/:id", EmployerEditVacancy); // postman

// Stats Routes
router.get("/stats", GetStats); // postman

module.exports = router;
