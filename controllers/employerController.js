const Employer = require("../models/employerModel");
const EmployerPortfolio = require("../models/CompanyPortfolioModel");
const EmployerJobs = require("../models/JobModel");
const EmployerApplicants = require("../models/ApplicantModel");

// todo: fix the functions to do the proper database queries

// Employer Get Employer
const EmployerGetEmployer = async (req, res) => {
  const employerId = req.user._id;
  try {
    const employer = await Employer.findById({ employerId });
    if (!employer) {
      return res.status(400).json({ error: "no such employer" });
    }
    res.status(200).json(employer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Employer Get Portfolio
const EmployerGetPortfolio = async (req, res) => {
  const employerId = req.user._id;
  try {
    const employer = await Employer.findById({ employerId });
    if (!employer) {
      return res.status(400).json({ error: "no such employer" });
    }
    res.status(200).json(employer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Employer Edit Portfolio Without Photo
const EmployerUpdatePortfolioWithoutPhoto = async (req, res) => {
  const employerId = req.user._id;
  try {
    const employer = await Employer.findById({ employerId });
    if (!employer) {
      return res.status(400).json({ error: "no such employer" });
    }
    res.status(200).json(employer);
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
      console.log("resume deleted");
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
  const _id = req.params.id;
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
  const _id = req.params.id;
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

const EmployerGetStats = async (req, res) => {
  const employerId = req.user._id;

  try {
    // Run queries in parallel
    const [portfolio, jobs, applicants] = await Promise.all([
      EmployerPortfolio.findOne({ company_id: employerId }),
      EmployerJobs.find({ company_id: employerId }),
      EmployerApplicants.find({ company_id: employerId }),
    ]);

    // If any of the queries returned null or undefined, handle it
    if (!portfolio || !jobs || !applicants) {
      return res
        .status(404)
        .json({ error: "Data not found for the employer." });
    }

    // Calculate portfolio percentage complete if it's dynamic
    const portfolioPercentageComplete = calculatePortfolioCompletion(portfolio);

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


const Job = require('../models/JobModel')

// Employer Create Job
const EmployerCreateJob = async (req, res) => {
    const company_id = req.user._id
    const {company,title,location,shortDescription,description,salary,jobType,noOfCandidates,setUp,duties,requirements} = req.body
    try{
        const job = await Job.create({company, title,company_id,location,shortDescription,description,salary,jobType,noOfCandidates,setUp,duties,requirements})
        res.status(200).json(job)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

// Employer Get Vacancies
const EmployerGetVacancies = async (req, res) =>{
    const company_id = req.user._id
    try{
        const jobs = await Job.find({company_id}).sort({createdAt: -1})
        res.status(200).json(jobs)
        console.log(jobs)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

// Employer Get Vacancy
const EmployerGetVacancy = async (req, res) =>{
    const _id = req.params.id
    try{
        const job = await Job.findById(_id)
        res.status(200).json(job)
        console.log(job)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

// Employer Get Applicants
const EmployerGetApplicants = async (req, res) =>{
    const company_id = req.user._id
    try{
        const jobs = await Job.find({company_id}).sort({createdAt: -1})
        res.status(200).json(jobs)
        console.log(jobs)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

// Employer Edit Vacancy
const  EmployerEditVacancy = async (req, res) => {
    const _id = req.params.id;
    try {
      const project = await Portfolio.findByIdAndUpdate(_id, {
        ...req.body,
      });
      res.status(200).json({ message: "edited sucessfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// Employer Delete Vacancy
const EmployerDeleteVacancy = async (req, res) =>{
    const  id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such id'})
    }
    try{
        const job = await Job.findOneAndDelete({_id: id})
        if(!job){
            return res.status(400).json({error: 'no such job'})
        }
        res.status(200).json(job)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

// Employer Edit Applicant => reject applicant
const EmployerEditApplicant = async (req, res) => {
    const _id = req.params.id;
    try {
      const project = await Portfolio.findByIdAndUpdate(_id, {
        ...req.body,
      });
      res.status(200).json({ message: "edited sucessfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

module.exports = {
  EmployerGetEmployer,
  EmployerGetPortfolio,
  EmployerUpdatePortfolioWithoutPhoto,
  EmployerDeleteEmployer,
  employerChangePasswordEmployer,
  employerCheckPasswordEmployer,
  EmployerGetStats,
};
