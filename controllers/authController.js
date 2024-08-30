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
  const { email, username, password } = req.body;

  try {
    if (!email || !password) {
      throw Error("Please fill in email and password");
    }

    const existsemail = await Employee.findOne({ email });
    const existsusername = await Employee.findOne({ username });

    if (existsemail && !existsusername) {
      throw Error("Email already exists");
    }

    if (!existsemail && existsusername) {
      throw Error("Username already exists");
    }

    if (existsemail && existsusername) {
      throw Error("Username and email taken");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create User
    const user = await Employee.create({ email, username, password: hash });

    // Create Portfolio for User
    const portfolio = await Portfolio.create({
      user_id: user._id,
      surname: "Doe",
      name: "John",
      location: "Unknown", // Assuming a default value for location
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
      username: user.username,
    });
    console.log(user, token);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error.message);
  }
};

const createEmployer = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    if (!email || !password) {
      throw Error("Please fill in email and password");
    }

    const existsemail = await Employer.findOne({ email });
    const existsusername = await Employer.findOne({ username });

    if (existsemail && !existsusername) {
      throw Error("Email already exists");
    }

    if (!existsemail && existsusername) {
      throw Error("Username already exists");
    }

    if (existsemail && existsusername) {
      throw Error("Username and email taken");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create User
    const user = await Employer.create({ email, username, password: hash });

    // Create Portfolio for User
    const portfolio = await EmployerPortfolio.create({
      user_id: user._id,
      surname: "Doe",
      name: "John",
      location: "Unknown", // Assuming a default value for location
      about: "Hi, I am John Doe and I am a professional in my field.",
      website: "https://example.com",
      skills: ["Skill1", "Skill2"], // Assuming some default skills
      contact_no: "+123456789", // Assuming a default contact number
      active: true,
      recruiter_type: "General", // Assuming a default recruiter type
      views: 0,
    });

    // Create JWT Token
    const token = createToken(user._id);

    res.status(200).json({
      user,
      token,
      portfolio,
      preferences,
      resume,
      username: user.username,
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
