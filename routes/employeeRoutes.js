const express = require("express");
const router = express.Router();
const EmployeeAuth = require("../middlewear/requireEmployeeAuth");
const upload = require("../middlewear/uploadMiddlewear");
/* const {
  EmployeeGet,
  EditResume,
  EditPortfolio,
  GetApplications,
  EditApplication,
  GetPortfolio,
  DeleteAccount,
  ChangePasswordEmployer,
  CheckPasswordEmployer,
  WriteReview,
  UpdatePreferences,
  GetPreferences,
  EmployeeApplyJob,
  GetStats,
  uploadCv,
} = require("../controllers/employeeController");

router.use(EmployeeAuth);

// todo: other ep for the other routes

router.post("/addCvDocument", upload.single("cv"), uploadCv);

router.get("/getOne", EmployeeGet);

router.delete("/delete", DeleteAccount);

router.delete("/deleteCvDocument", deleteCv);

router.get("/apply/job/:jobId/:companyId", applyJob);

router.get("/job/jobinfo/:id", getSingleJobEmployee);

router.get("/review/:id");
 */
module.exports = router;
