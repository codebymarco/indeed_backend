const express = require("express");
const router = express.Router();
const upload = require("../middlewear/uploadMiddlewear");


const EmployerAuth = require("../middlewear/requireEmployerAuth");

const {
  GetPortfolio,
  EditPortfolio,
  EmployerDeleteEmployer,
  employerChangePasswordEmployer,
  employerCheckPasswordEmployer,
  EmployerGetStats,
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
router.post("/application", EmployerEditApplicant);
router.get("/application", EmployerGetApplicants);

// Portfolio Routes
router.put("/portfolio", EditPortfolio); // postman
router.get("/portfolio", GetPortfolio); // postman
router.put("/portfolio/photo", upload.single("cv"), EditPortfolioPhoto);

// Job Routes
router.delete("/job/:id", EmployerDeleteVacancy); // postman
router.get("/job", EmployerGetVacancies); // postman
router.get("/job/:id", EmployerGetVacancy); // postman
router.post("/job", EmployerCreateJob); // postman
router.put("/job/:id", EmployerEditVacancy); // postman

// Stats Routes
router.get("/stats", GetStats); // postman

module.exports = router;
