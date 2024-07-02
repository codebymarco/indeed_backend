const User = require("../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Employer = require("../models/employerModel");
const axios = require("axios");

const createToken = (_id) => {
  return jwt.sign({ _id }, "hellogiysgsh", { expiresIn: "3d" });
};

//post user
const createUser = async (req, res) => {
  const { email, password } = req.body;

  if (email) {
    try {
      if (!email || !password) {
        throw Error("all fields must be filled");
      }

      const exists = await User.findOne({ email });

      if (exists) {
        throw Error("email already exists");
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const user = await User.create({ email, password: hash });

      const token = createToken(user._id);

      res.status(200).json({ user, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

//signin user
const loginUser = async (req, res) => {
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

//post user
const createEmployer = async (req, res) => {
  const { email, password, companyName, fullName, contactNumber, role } =
    req.body;
  try {
    const exists = await Employer.findOne({ email });

    if (exists) {
      throw Error("email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await Employer.create({
      email,
      password: hash,
      companyName,
      fullName,
      contactNumber,
      role,
    });

    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//signin user
const loginEmployer = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw Error("all filed required");
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

//delete employer
const deleteEmployer = async (req, res) => {
  const id = req.user._id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such id" });
  }
  try {
    const employer = await Employer.findOneAndDelete({ _id: id });
    if (!employer) {
      return res.status(400).json({ error: "employer does not exist" });
    }
    res.status(200).json(employer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  loginUser,
  createEmployer,
  loginEmployer,
  deleteEmployer,
};
