const Portfolio = require("../models/employeePortfolio");
const EmployerPortfolio = require("../models/employerPortfolio");
const Resume = require("../models/resume");
const Preferences = require("../models/preferences");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Employee = require("../models/employee");
const Employer = require("../models/employer");

const createToken = (_id) => {
  return jwt.sign({ _id }, "indeed", { expiresIn: "3d" });
};

const createEmployee = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw Error("Please fill in email and password");
    }

    const existsemail = await Employee.findOne({ email });

    if (existsemail) {
      throw Error("Email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create User
    const user = await Employee.create({ email, password: hash });

    // Create Portfolio for User
    const portfolio = await Portfolio.create({
      user_id: user._id,
      surname: "",
      name: "",
      location: "", // Assuming a default value for location
      age: "", // Assuming a default value for location
      occupation: "", // Assuming a default value for location
      about: "",
      website: "",
      skills: [], // Assuming some default skills
      contact_no: "", // Assuming a default contact number
      active: true,
      recruiter_type: "", // Assuming a default recruiter type
      views: 0,
    });

    // Create Preferences for User
    const preferences = await Preferences.create({
      user_id: user._id,
      saved: [],
      hidden: [],
    });

    // Create Resume for User
    const resume = await Resume.create({
      photo: "", // Assuming a default path for the resume
      user_id: user._id,
      deleted: false,
      mimetype: "", // Assuming PDF as the default mimetype
    });

    // Create JWT Token
    const token = createToken(user._id);

    res.status(200).json({
      user,
      token,
      portfolio,
      preferences,
      resume,
    });
    console.log(user, token);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error.message);
  }
};

const createEmployer = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw Error("Please fill in email and password");
    }

    const existsemail = await Employee.findOne({ email });

    if (existsemail) {
      throw Error("Email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create User
    const user = await Employer.create({ email, password: hash });

    // Create Portfolio for User
    const portfolio = await EmployerPortfolio.create({
      user_id: user._id.toString(), // Use the user's ID for company_id
      photo: "", // Assuming a default photo URL
      name: "", // Assuming a default name
      location: "", // Assuming a default value for location
      work_force: "", // Assuming a default work force range
      website: "",
      hr_emails: [], // Assuming a default HR email
      contact_no: [], // Assuming a default contact number
      active: true,
      recruiter_type: "", // Assuming a default recruiter type
      views: 0
    });

    // Create JWT Token
    const token = createToken(user._id);

    res.status(200).json({
      user,
      token,
      portfolio
    });
    console.log(user, token);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error.message);
  }
};


// loginemployee
const loginEmployee = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw Error("all fields must be filled");
    }

    const user = await Employee.findOne({ email });

    if (!user) {
      throw Error("incorrect email");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw Error("incorrect password");
    }

    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// loginemployer
const loginEmployer = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw Error("all fields must be filled");
    }

    const user = await Employer.findOne({ email });

    if (!user) {
      throw Error("incorrect email");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw Error("incorrect password");
    }

    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginEmployee,
  loginEmployer,
  createEmployee,
  createEmployer,
};
