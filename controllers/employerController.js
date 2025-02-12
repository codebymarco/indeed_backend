const User = require("../models/employer");
const Portfolio = require("../models/employerPortfolio");
const EmployeePortfolio = require("../models/employeePortfolio");
const Job = require("../models/vacancy");
const Applicant = require("../models/application");
const mongoose = require("mongoose");
const Resume = require("../models/resume");
const bcrypt = require("bcrypt");

// Employer Get Portfolio
const GetPortfolio = async (req, res) => {
  console.log("request_user", req.user);
  const user_id = req.user._id; // Assuming this is the user's ID from authentication middleware

  try {
    // Assuming user_id is a field in the User model representing a reference to the user
    const portfolio = await Portfolio.findOne({ user_id });

    if (!portfolio) {
      // If no portfolio found for the given user_id, return 404
      return res.status(404).json({ error: "No such portfolio" });
    }

    // If portfolio found, return it
    res.status(200).json(portfolio);
  } catch (error) {
    // Handle unexpected errors with a 500 status
    res.status(500).json({ error: error.message });
  }
};

// Employer Edit Portfolio Without Photo
const EditPortfolio = async (req, res) => {
  const userId = req.params.user_id; // Assuming user_id is passed as a route parameter
  const body = req.body;
  delete body._id;
  try {
    const updated = await Portfolio.findOneAndUpdate(
      { company_id: userId }, // Find resume by user_id
      { ...body }, // Update with request body
      { new: true } // Return the updated document
    );

    if (!updated) {
      // If no resume is found, return a 404 error
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json({ message: "Edited successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Employer Delete Employer
const EmployerDeleteEmployer = async (req, res) => {
  const user_id = req.user._id;
  try {
    const deletedUser = await User.findOneAndDelete({ _id: user_id });
    if (deletedUser) {
      res.status(200).json(true);
    }
    if (!deletedUser) {
      res.status(200).json(false);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// EmployerChangePasswordEmployer
const employerChangePasswordEmployer = async (req, res) => {
  const _id =  req.user._id;
  const { password } = req.body;
  try {
    const user = await User.findOne({ _id });
    if (!user) {
      throw Error("user not exist");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newpassword = await User.findByIdAndUpdate(_id, { password: hash });
    if (newpassword) {
      res.status(200).json("password changed");
    } else {
      throw Error("something bad happened");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// EmployerCheckPasswordEmployer
const employerCheckPasswordEmployer = async (req, res) => {
  const _id = req.user._id;
  const { password } = req.body;
  try {
    const user = await User.findOne({ _id });
    if (!user) {
      throw Error("user not exist");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw Error("incorrect password");
    }

    res.status(200).json("password ok");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GetStats
// Done
const GetStats = async (req, res) => {
  const employeeId = req.user._id;

  try {
    // Run queries in parallel
    const [portfolio, jobs, applicants] = await Promise.all([
      Portfolio.findOne({ user_id: employeeId }),
      Job.find({ company_id: employeeId }),
      Applicant.find({ employer_id: employeeId, rejected: false }),
    ]);

    // If any of the queries returned null or undefined, handle it
    if (!portfolio || !jobs || !applicants) {
      return res
        .status(404)
        .json({ error: "Data not found for the employer." });
    }

    console.log("datrta jobs", jobs);

    const portfolioPercentageComplete = 90;

    res.status(200).json({
      jobsCount: jobs.length,
      applicantsCount: applicants.length,
      portfolioPercentageComplete: portfolioPercentageComplete,
    });
  } catch (error) {
    console.error("Error fetching employer stats:", error); // Log error for debugging
    res.status(500).json({ error: "An error occurred while fetching stats." });
  }
};

// Example function to calculate portfolio completion
const calculatePortfolioCompletion = (portfolio) => {
  // Logic to determine percentage complete
  // This is a placeholder example, replace with your actual calculation
  return portfolio ? "90%" : "0%";
};

// Employer Create Job
const EmployerCreateJob = async (req, res) => {
  const company_id = req.user._id;
  try {
    const name = await User.findOne({ id: company_id });
    const job = await Job.create({
      ...req.body,
      company_id,
      company_name: name.name,
    });
    res.status(200).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Employer Get Vacancies
const EmployerGetVacancies = async (req, res) => {
  console.log("request_user", req.user);

  const company_id = req.user._id;
  try {
    const jobs = await Job.find({ company_id }).sort({ createdAt: -1 });
    res.status(200).json(jobs);
    console.log(jobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Employer Get Vacancy
const EmployerGetVacancy = async (req, res) => {
  const _id = req.params.id;
  try {
    const job = await Job.findById(_id);
    res.status(200).json(job);
    console.log(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Employer Get Applicants
const EmployerGetApplicants = async (req, res) => {
  console.log("request_user", req.user);
  const company_id = req.user._id;
  
  try {
    const apps = await Applicant.find({
      employer_id: company_id,
      rejected: false,
    }).sort({ createdAt: -1 });

    const newArray = [];

    // Use for...of loop to handle async calls
    for (const app of apps) {
      const user_id = app.user_id; // Assuming the app has a user_id field
      
      // Fetch portfolio and resume using async/await
      const portfolio = await EmployeePortfolio.findOne({ user_id });
      const resume = await Resume.findOne({ user_id });

      const applicant_name = portfolio ? portfolio.name + portfolio.surname : '';
      const resume_link = resume ? resume.photo : '';

      // Add the new fields to the applicant object
      const newapp = {
        ...app._doc, // Spread the existing fields from the app document
        applicant_name,
        resume_link,
      };

      newArray.push(newapp);
    }

    res.status(200).json(newArray);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



// Employer Edit Vacancy
const EmployerEditVacancy = async (req, res) => {
  const _id = req.params.id;
  try {
    const project = await Job.findByIdAndUpdate(_id, {
      ...req.body,
    });
    res.status(200).json({ message: "edited sucessfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Employer Delete Vacancy
const EmployerDeleteVacancy = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such id" });
  }
  try {
    const job = await Job.findOneAndDelete({ _id: id });
    if (!job) {
      return res.status(400).json({ error: "no such job" });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Employer Edit Applicant => reject applicant
const EmployerEditApplicant = async (req, res) => {
  const _id = req.params.id;
  try {
    const project = await Applicant.findByIdAndUpdate(_id, {
      ...req.body,
    });
    res.status(200).json({ message: "edited sucessfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Upload CV
const EditPortfolioPhoto = async (req, res) => {
  const user_id = req.user._id;
  const url = req.protocol + "://" + req.get("host");
  const photo = url + "/images/" + req.file.filename;
  const mimetype = req.file.mimetype;

  try {
    const updated = await Portfolio.findOneAndUpdate(
      { user_id: user_id }, // Find resume by user_id
      { mimetype: mimetype, photo }, // Update with request body
      { new: true } // Return the updated document
    );
    res.status(200).json(updated);
    console.log(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error.message);
  }
};

// Delete Account
// Done
const DeleteAccount = async (req, res) => {
  const _id = req.user._id;
  try {
    const user = await User.findOneAndDelete({ _id });
    if (!user) {
      return res.status(400).json({ error: "no such user" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  DeleteAccount,
  GetPortfolio,
  EditPortfolio,
  EmployerDeleteEmployer,
  employerChangePasswordEmployer,
  employerCheckPasswordEmployer,
  GetStats,
  EmployerCreateJob,
  EmployerGetVacancies,
  EmployerGetVacancy,
  EmployerGetApplicants,
  EmployerEditVacancy,
  EmployerDeleteVacancy,
  EmployerEditApplicant,
  EditPortfolioPhoto,
};
