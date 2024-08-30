const User = require("../models/userModel");
const Portfolio = require("../models/employeePortfolio");
const Resume = require("../models/resume");
const Preferences = require("../models/preferences");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Employer = require("../models/employerModel");
const axios = require("axios");

const createToken = (_id) => {
  return jwt.sign({ _id }, "indeed", { expiresIn: "3d" });
};

const createUserEmployee = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    if (!email || !password) {
      throw Error("Please fill in email and password");
    }

    const existsemail = await User.findOne({ email });
    const existsusername = await User.findOne({ username });

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
    const user = await User.create({ email, username, password: hash });

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
      path: "default/resume/path", // Assuming a default path for the resume
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

// create user employer
const createUserEmployer = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    if (!email || !password) {
      throw Error("please fill in email and password");
    }

    const existsemail = await User.findOne({ email });
    const existsusername = await User.findOne({ username });

    if (existsemail && !existsusername) {
      throw Error("email already exists");
    }

    if (!existsemail && existsusername) {
      throw Error("username already exists");
    }

    if (existsemail && existsusername) {
      throw Error("username and email taken");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ email, username, password: hash });
    const portfolio = await Portfolio.create({
      user_id: user._id,
      template: `ONE`,
      active: true,
      views: 0,
      name: "John Doe",
      about: "Hi I am John Doe and I am a Occupation",
      links: [
        {
          type: "read",
          label: "email",
          value: "miguelmarcoramcharan@gmail.com",
        },
        {
          type: "link",
          label: "facebook",
          value: "https://youtube.com",
        },
      ],
    });

    console.log(portfolio);

    const token = createToken(user._id);

    res.status(200).json({ user, token, portfolio, username: user.username });
    console.log(user, token);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error.message);
  }
};

// login user employee
const loginUserEmployee = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw Error("all fields must be filled");
    }

    const user = await User.findOne({ email });

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

// login user employer
const loginUserEmployer = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw Error("all fields must be filled");
    }

    const user = await User.findOne({ email });

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
  createUser,
  loginUser,
  createEmployer,
  loginEmployer,
};
