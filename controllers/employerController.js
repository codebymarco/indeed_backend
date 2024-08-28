const Employer = require("../models/employerModel");

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
  EmployerGetEmployer,
  EmployerGetPortfolio,
  EmployerUpdatePortfolioWithoutPhoto,
  EmployerDeleteEmployer,
  employerChangePasswordEmployer,
  employerCheckPasswordEmployer,
  EmployerGetStats
};
