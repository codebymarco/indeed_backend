const User = require("../models/employee");
const Resume = require("../models/resume");
const Portfolio = require("../models/employeePortfolio");
const Job = require("../models/vacancy");
const Application = require("../models/application");
const Review = require("../models/review");
const Preferences = require("../models/preferences");
const { createPortfolioInDB } = require("../db/employee");

// EditResume
// DeleteResume
const EditResume = async (req, res) => {
  const userId = req.user._id;
  try {
    const updated = await Resume.findOneAndUpdate(
      { user_id: userId }, // Find resume by user_id
      { ...req.body }, // Update with request body
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

// EditPortfolio
// Done
const EditPortfolio = async (req, res) => {
  const userId = req.user._id; // Assuming user_id is passed as a route parameter
  try {
    const updated = await Portfolio.findOneAndUpdate(
      { user_id: userId }, // Find resume by user_id
      { ...req.body }, // Update with request body
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

// GetResume
// Done
const GetResume = async (req, res) => {
  const user_id = req.user._id; // Assuming this is the user's ID from authentication middleware

  try {
    // Assuming user_id is a field in the User model representing a reference to the user
    const portfolio = await Resume.findOne({ user_id });

    if (!portfolio) {
      // If no portfolio found for the given user_id, return 404
      return res.status(404).json({ error: "No such resume" });
    }

    // If portfolio found, return it
    res.status(200).json(portfolio);
  } catch (error) {
    // Handle unexpected errors with a 500 status
    res.status(500).json({ error: error.message });
  }
};

// GetPortfolio
// Done
const GetPortfolio = async (req, res) => {
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

// DeleteApplication
const DeleteApplication = async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await Application.findOneAndDelete({ _id });
    if (!user) {
      return res.status(400).json({ error: "no such user" });
    }
    res.status(200).json(user);
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

// Controller function for creating a portfolio
const CreatePortfolio = async (req, res) => {
  const user_id = req.user._id;

  try {
    // Call the helper function to create the portfolio in the database
    const portfolio = await createPortfolioInDB(user_id, req.body);

    // Send the created portfolio in the response
    res.status(200).json(portfolio);
  } catch (error) {
    // Handle any errors that occurred during the portfolio creation
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

// CreateApplication
const CreateApplication = async (req, res) => {
  const user_id = req.user._id;
  try {
    const review = await Application.create({
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
  const userId = req.user._id; // Assuming user_id is passed as a route parameter
  try {
    const updated = await Preferences.findOneAndUpdate(
      { user_id: userId }, // Find resume by user_id
      { ...req.body }, // Update with request body
      { new: true } // Return the updated document
    );

    if (!updated) {
      // If no resume is found, return a 404 error
      return res.status(404).json({ message: "Pref not found" });
    }

    res.status(200).json({ message: "Edited successfully" });
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
  const user_id = req.user._id;
  try {
    const review = await Application.create({
      ...req.body,
      user_id,
    });
    res.status(200).json(review);
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
      Job.find({ user_id: employeeId }),
      Application.find({ user_id: employeeId }),
    ]);

    // If any of the queries returned null or undefined, handle it
    if (!portfolio || !jobs || !applicants) {
      return res
        .status(404)
        .json({ error: "Data not found for the employer." });
    }

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

// Upload CV
const EditResumeFile = async (req, res) => {
  const user_id = req.user._id;
  const url = req.protocol + "://" + req.get("host");
  const pdfCv = url + "/images/" + req.file.filename;
  const mimetype = req.file.mimetype;

  try {
    const updated = await Resume.findOneAndUpdate(
      { user_id: user_id }, // Find resume by user_id
      { mimetype: mimetype, path: pdfCv }, // Update with request body
      { new: true } // Return the updated document
    );
    res.status(200).json(updated);
    console.log(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error.message);
  }
};

module.exports = {
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
  EditResumeFile,
  CreatePortfolio,
  DeleteApplication,
  CreateApplication,
  GetResume,
};
