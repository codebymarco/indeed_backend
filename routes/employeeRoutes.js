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
} = require("../controllers/employeeController");

router.use(EmployeeAuth);

// Resume Routes
router.put("/resume/file", upload.single("cv"), EditResumeFile);
router.put("/resume", EditResume);

// Account Routes
router.delete("/account", DeleteAccount);
router.post("/account/password/check", CheckPasswordEmployer);
router.post("/account/password/change", ChangePasswordEmployer);

// Application Routes
router.delete("/application/:id", DeleteApplication);
router.post("/application", CreateApplication);
router.get("/application", GetApplications);
router.get("/application", GetApplications);

// Review Routes
router.post("/review", WriteReview);

// Portfolio Routes
router.put("/portfolio", EditPortfolio);
router.get("/portfolio", GetPortfolio);

// Stats Routes
router.get("/stats", GetStats);

// Preferences Routes
router.put("/preferences", UpdatePreferences);
router.get("/preferences", GetPreferences);

// Apply Job Routes
router.post("/apply", EmployeeApplyJob);

module.exports = router;
