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
      surname: "Doe",
      name: "John",
      location: "Unknown", // Assuming a default value for location
      age: "29", // Assuming a default value for location
      occupation: "deeloper", // Assuming a default value for location
      about: "Hi, I am John Doe and I am a professional in my field.",
      website: "https://example.com",
      skills: ["Skill1", "Skill2"], // Assuming some default skills
      contact_no: "+123456789", // Assuming a default contact number
      active: true,
      recruiter_type: "General", // Assuming a default recruiter type
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
      path: "", // Assuming a default path for the resume
      user_id: user._id,
      deleted: false,
      mimetype: "application/pdf", // Assuming PDF as the default mimetype
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
      company_id: user._id.toString(), // Use the user's ID for company_id
      photo: "https://example.com/photo.jpg", // Assuming a default photo URL
      name: "John Doe", // Assuming a default name
      location: "Unknown", // Assuming a default value for location
      work_force: "100-500", // Assuming a default work force range
      website: "https://example.com",
      hr_emails: ["hr@example.com"], // Assuming a default HR email
      contact_no: ["+123456789"], // Assuming a default contact number
      active: true,
      recruiter_type: "General", // Assuming a default recruiter type
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
