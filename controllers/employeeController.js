const User = require("../models/employee");
const Resume = require("../models/resume");
const Portfolio = require("../models/employeePortfolio");
const Job = require("../models/vacancy");
const Application = require("../models/application");
const Review = require("../models/review");
const Preferences = require("../models/preferences");

// EmployeeGet
// Done
const EmployeeGet = async (req, res) => {
  const id = req.user._id;
  try {
    const user = await User.findById({ id });
    if (!user) {
      return res.status(400).json({ error: "no such user" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// EditResume
// DeleteResume
// Done
const EditResume = async (req, res) => {
  const id = req.params.id;
  try {
    const updated = await Resume.findByIdAndUpdate(id, {
      ...req.body,
    });
    res.status(200).json({ message: "edited sucessfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// EditPortfolio
// Done
const EditPortfolio = async (req, res) => {
  const id = req.params.id;
  try {
    const project = await Portfolio.findByIdAndUpdate(id, {
      ...req.body,
    });
    res.status(200).json({ message: "edited sucessfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GetApplications
// Done
const GetApplications = async (req, res) => {
  const user_id = req.user._id;
  try {
    const apps = await Application.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(apps);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// EditApplication
// Done
const EditApplication = async (req, res) => {
  const id = req.params.id;
  try {
    const updated = await Application.findByIdAndUpdate(id, {
      ...req.body,
    });
    res.status(200).json({ message: "edited sucessfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GetPortfolio
// Done
const GetPortfolio = async (req, res) => {
  const user_id = req.user._id;
  try {
    const portfolio = await User.find({ user_id });
    if (!portfolio) {
      return res.status(400).json({ error: "no such portfolio" });
    }
    res.status(200).json(portfolio);
  } catch (error) {
    res.status(400).json({ error: error.message });
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

// ChangePasswordEmployer
// Done
const ChangePasswordEmployer = async (req, res) => {
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

// CheckPasswordEmployer
// Done
const CheckPasswordEmployer = async (req, res) => {
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

// WriteReview
// Done
const WriteReview = async (req, res) => {
  const user_id = req.user._id;
  // const {employer_id, body, rating} = req.body;
  try {
    const review = await Review.create({
      user_id,
      ...req.body,
    });
    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UpdatePreferences
// Done
const UpdatePreferences = async (req, res) => {
  const id = req.params.id;
  try {
    const updated = await Preferences.findByIdAndUpdate(id, {
      ...req.body,
    });
    res.status(200).json({ message: "edited sucessfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GetPreferences
// Done
const GetPreferences = async (req, res) => {
  const user_id = req.user._id;
  try {
    const preferences = await Preferences.findOne({ user_id });
    res.status(200).json(preferences);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// EmployeeApplyJob
// Todo: what to do here
const EmployeeApplyJob = async (req, res) => {
  // here we will get the type of applicaton from the body
  // type: email or send portfolio
};

// GetStats
// Done
const GetStats = async (req, res) => {
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

// add all the function to the export below

module.exports = {};
