const Job = require("../models/vacancy");
const Review = require("../models/review");

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

  // Define the regex filter for text search
  let queryFilter = searchQuery
    ? {
        $or: [
          { title: { $regex: searchQuery, $options: "i" } },
          { description: { $regex: searchQuery, $options: "i" } },
          { requirements: { $regex: searchQuery, $options: "i" } },
          { responsibilities: { $regex: searchQuery, $options: "i" } },
          { categories: { $regex: searchQuery, $options: "i" } }, // Corrected typo here
        ],
      }
    : {};

  // Define the filter for location
  let locationFilter = location
    ? { location: { $regex: location, $options: "i" } } // Enhanced to use regex
    : {};

  try {
    // Find jobs that match the filters
    const jobs = await Job.find({ ...queryFilter, ...locationFilter }).sort({
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

module.exports = {
  getAllJobs,
  searchJobs,
  WriteReview,
  GetJob
};
