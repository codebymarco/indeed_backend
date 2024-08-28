const User = require("../models/userModel");
const PdfRes = require("../models/pdfModel");

// todo: fix this page functions
// todo: fix the databse queries

// Employee Get Employee
const EmployeeGetEmployee = async (req, res) => {
  const employeeId = req.user._id;
  try {
    const employee = await User.findById({ employeeId });
    if (!employee) {
      return res.status(400).json({ error: "no such employee" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Employee Edit Resume
const EmployeeEditResume = async (req, res) => {
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

// Employee Delete Resume
const EmployeeDeleteResume = async (req, res) => {
  const employeeId = req.user._id;
  try {
    const cv = await PdfRes.findOneAndDelete({ user_id: employeeId });
    if (!cv) {
      return res.status(400).json({ error: "no cv for this user" });
    }
    res.status(200).json(cv);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Employee Edit Portfolio
const EmployeeEditPortfolio = async (req, res) => {
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

// Employee Get Applications
const EmployeeGetApplicantions = async (req, res) => {
  const company_id = req.user._id;
  try {
    const jobs = await Job.find({ company_id }).sort({ createdAt: -1 });
    res.status(200).json(jobs);
    console.log(jobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Employee Edit Application
const EmployeeEditApplication = async (req, res) => {
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

// Employee Get Portfolio
const EmployeeGetPortfolio = async (req, res) => {
  const employeeId = req.user._id;
  try {
    const employee = await User.findById({ employeeId });
    if (!employee) {
      return res.status(400).json({ error: "no such employee" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Employee Delete Account
const EmployeeDeleteAccount = async (req, res) => {
  const employeeId = req.user._id;
  try {
    const employee = await User.findOneAndDelete({ _id: employeeId });
    if (!employee) {
      return res.status(400).json({ error: "no such employee" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// EmployerChangePasswordEmployer
const EmployerChangePasswordEmployer = async (req, res) => {
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
const EmployerCheckPasswordEmployer = async (req, res) => {
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

// Employee Write Review
const EmployeeWriteReview = async (req, res) => {
  const company_id = req.user._id;
  const {
    company,
    title,
    location,
    shortDescription,
    description,
    salary,
    jobType,
    noOfCandidates,
    setUp,
    duties,
    requirements,
  } = req.body;
  try {
    const job = await Job.create({
      company,
      title,
      company_id,
      location,
      shortDescription,
      description,
      salary,
      jobType,
      noOfCandidates,
      setUp,
      duties,
      requirements,
    });
    res.status(200).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// EmployeeUpdatePreferences
const EmployeeUpdatePreferences = async (req, res) => {
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

// EmployeeGetPreferences
const EmployeeGetPreferences = async (req, res) => {
  const company_id = req.user._id;
  try {
    const jobs = await Job.find({ company_id }).sort({ createdAt: -1 });
    res.status(200).json(jobs);
    console.log(jobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// EmployeeApplyJob
const EmployeeApplyJob = async (req, res) => {
  // here we will get the type of applicaton from the body
  // type: email or send portfolio
};

const EmployeeGetStats = async (req, res) => {
  const employerId = req.user._id;

  // get portoflio completion count
  // get applications count
  // get vacancies cpunt
  // Employer Get Employer

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



module.exports = {
  getSingleEmployee,
  deleteEmployee,
  deleteCv,
  EmployeeGetStats
};
