const Job = require("../models/vacancy");
const Review = require("../models/review");
const EmployeePortfolio = require("../models/employeePortfolio");
const EmployerPortfolio = require("../models/employerPortfolio");

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
  const location = req.query.location; // Expecting an array of strings

  // Define the regex filter for text search
  let queryFilter = searchQuery
    ? {
        $or: [
          { title: { $regex: searchQuery, $options: "i" } },
          { description: { $regex: searchQuery, $options: "i" } },
          { requirements: { $regex: searchQuery, $options: "i" } },
          { responsibilities: { $regex: searchQuery, $options: "i" } },
          { categories: { $regex: searchQuery, $options: "i" } },
        ],
      }
    : {};

  // Define the filter for location
  let locationFilter =
    location && Array.isArray(location)
      ? {
          location: {
            $in: location.map((loc) => new RegExp(loc, "i")), // Convert each location string to a regex
          },
        }
      : {};

  try {
    // Find jobs that match the filters
    const jobs = await Job.find({
      ...queryFilter,
      ...locationFilter,
      active: true,
    }).sort({
      createdAt: -1,
    });

    // Return the jobs in response
    res.status(200).json(jobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const WriteReview = async (req, res) => {
  try {
    const review = await Review.create({
      user_id: "anonymous",
      ...req.body,
    });
    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetJob = async (req, res) => {
  const id = req.params.id;
  try {
    const job = await Job.findById(id);
    res.status(200).json(job);
    console.log(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetEmployer = async (req, res) => {
  const id = req.params.id;
  try {
    const job = await EmployerPortfolio.findOne({ user_id: id });
    if (!job.active) {
      throw Error("portfolio not active");
    }
    res.status(200).json(job);
    console.log(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetEmployee = async (req, res) => {
  const id = req.params.id;
  try {
    const job = await EmployeePortfolio.findOne({ user_id: id });
    if (!job.active) {
      throw Error("portfolio not active");
    }
    res.status(200).json(job);
    console.log(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetReviews = async (req, res) => {
  const id = req.params.id;
  try {
    const job = await Review.find({ employer_id: id });
    res.status(200).json(job);
    console.log(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetJobTitlesAndCategories = async (req, res) => {
  try {
    // Fetch all jobs and select only the title and categories fields
    const jobs = await Job.find({}, "title categories");

    // Extract titles and categories into a single array
    const resultArray = jobs.flatMap((job) => [
      job.title,
      ...job.categories, // Spread the categories array
    ]);

    // Return the combined array of titles and categories
    res.status(200).json(resultArray);
    console.log(resultArray);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllJobs,
  searchJobs,
  WriteReview,
  GetJob,
  GetEmployee,
  GetEmployer,
  GetReviews,
  GetJobTitlesAndCategories,
};
