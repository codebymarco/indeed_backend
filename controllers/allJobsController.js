const Job = require("../models/vacancy");
const User = require("../models/employee");

//get single employer
const getAllJobs = async (req, res) => {
  console.log("user", req.query);
  const page = parseInt(req.query.page);
  const limit = 10;
  const skip = page * limit - 10;
  try {
    const count = await Job.find().count();
    console.log(count);
    const jobs = await Job.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    res.status(200).json({ jobs, count });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const searchJobs = async (req, res) => {
  const searchQuery = req.query.query;
  const location = req.query.location;
  let queryFilter =
    searchQuery && searchQuery !== "all"
      ? {
          title: {
            $regex: searchQuery,
            $options: "i",
          },
        }
      : {};
  let locationFilter = location && location !== "all" ? { location } : {};
  try {
    const jobs = await Job.find({ ...queryFilter, ...locationFilter }).sort({
      createdAt: -1,
    });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// NoUserPostReview
const noUserPostReview = async (req, res) => {
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

module.exports = {
  getAllJobs,
  searchJobs,
  noUserPostReview,
};
