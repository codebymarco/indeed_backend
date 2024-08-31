const express = require("express");
const router = express.Router();
const EmployeeAuth = require("../middlewear/requireEmployeeAuth");
const upload = require("../middlewear/uploadMiddlewear");
const {
  EditResume,
  EditPortfolio,
  GetApplications,
  GetPortfolio,
  DeleteAccount,
  ChangePasswordEmployer,
  CheckPasswordEmployer,
  WriteReview,
  UpdatePreferences,
  GetPreferences,
  EmployeeApplyJob,
  GetStats,
  EditResumeFile,
  DeleteApplication,
  CreateApplication,
  GetResume,
} = require("../controllers/employeeController");

router.use(EmployeeAuth);

// Resume Routes
router.put("/resume/file", upload.single("cv"), EditResumeFile); // todo
router.put("/resume", EditResume); // postman
router.get("/resume", GetResume); // postman

// Account Routes
router.delete("/account", DeleteAccount); // postman
router.post("/account/password/check", CheckPasswordEmployer); // postman
router.post("/account/password/change", ChangePasswordEmployer); // postman

// Application Routes
router.delete("/application/:id", DeleteApplication); // postman
router.post("/application", CreateApplication); // postman
router.get("/application", GetApplications); // postman

// Review Routes
router.post("/review", WriteReview); // postman

// Portfolio Routes
router.put("/portfolio", EditPortfolio); // postman
router.get("/portfolio", GetPortfolio); // postman

// Stats Routes
router.get("/stats", GetStats); // postman

// Preferences Routes
router.put("/preferences", UpdatePreferences); // postman
router.get("/preferences", GetPreferences); // postman

// Apply Job Routes
router.post("/apply", EmployeeApplyJob); // todo

module.exports = router;
