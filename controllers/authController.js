const User = require("../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Employer = require("../models/employerModel");
const axios = require("axios");

const createToken = (_id) => {
  return jwt.sign({ _id }, "hellogiysgsh", { expiresIn: "3d" });
};

// create user employee
const createUserEmployee = async (req, res) => {
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
  loginEmployer};
