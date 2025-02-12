const Employer = require("../models/employer");
const Portfolio = require("../models/employerPortfolio");
const Job = require("../models/vacancy");
const bcrypt = require("bcrypt");

const createMultipleCompanies = async (req, res) => {
  try {
    const companies = [];
    const locations = [
      {
        city: "London",
        state: "England",
        county: "Greater London",
        country: "United Kingdom",
      },
      {
        city: "Durban",
        state: "KwaZulu-Natal",
        county: "eThekwini Metropolitan Municipality",
        country: "South Africa",
      },
      {
        city: "Paris",
        state: "Île-de-France",
        county: "Paris",
        country: "France",
      },
      {
        city: "New York",
        state: "New York",
        county: "New York County",
        country: "United States",
      },
      { city: "Berlin", state: "Berlin", county: "Berlin", country: "Germany" },
      {
        city: "Tokyo",
        state: "Tokyo",
        county: "Tokyo Metropolis",
        country: "Japan",
      },
      {
        city: "Sydney",
        state: "New South Wales",
        county: "Sydney County",
        country: "Australia",
      },
      {
        city: "Toronto",
        state: "Ontario",
        county: "Toronto",
        country: "Canada",
      },
      {
        city: "Mumbai",
        state: "Maharashtra",
        county: "Mumbai",
        country: "India",
      },
      {
        city: "Rio de Janeiro",
        state: "Rio de Janeiro",
        county: "Rio de Janeiro",
        country: "Brazil",
      },
      // Add more locations if needed
    ];

    const companyNames = [
      "Tech Innovators",
      "Blue Ocean Enterprises",
      "Green Energy Solutions",
      "Global Ventures",
      "NextGen Technologies",
      "Quantum Dynamics",
      "Solaris Industries",
      "Evergreen Corp",
      "Pinnacle Systems",
      "Zenith Software",
      "Visionary Labs",
      "Apex Solutions",
      "Digital Pioneers",
      "Skyline Analytics",
      "Infinity Innovations",
      "Bright Horizon",
      "Vanguard Enterprises",
      "Summit Global",
      "EchoTech Group",
      "Nova Systems",
      "Fusion Tech Solutions",
      "Elite Innovations",
      "Bright Future Technologies",
      "Skyline Ventures",
      "Nova Technologies",
      "Pinnacle Innovations",
      "Quantum Enterprises",
      "Global Horizons",
      "NextGen Innovations",
      "Zenith Dynamics",
    ];

    for (let i = 0; i < 30; i++) { // Updated to create 30 companies
      const name = companyNames[i];
      const password = `pass${i + 1}`;
      const email = `${name.toLowerCase().replace(/\s+/g, "")}@company.com`;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const user = await Employer.create({ email, password: hash, name });

      const portfolio = await Portfolio.create({
        user_id: user._id.toString(),
        photo: "https://via.placeholder.com/150", // Placeholder photo URL
        name,
        location: [locations[i % locations.length].city], // Cycle through locations
        work_force: `${(i + 1) * 10}`, // Random work force size
        website: `https://${name.toLowerCase().replace(/\s+/g, "")}.com`,
        hr_emails: [
          `hr@${name.toLowerCase().replace(/\s+/g, "")}.com`,
          `hr2@${name.toLowerCase().replace(/\s+/g, "")}.com`,
        ],
        contact_no: [`+123456${i + 1}`, `+654321${i + 1}`],
        active: true,
        recruiter_type: "company",
        views: 0,
      });

      const company_id = user._id.toString();
      await createJobs(company_id, name, locations);
      companies.push({ user, portfolio });
    }

    res.status(200).json({ companies });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error.message);
  }
};

const createJobs = async (company_id, company_name, locations) => {
  try {
    const jobs = generateJobs(company_id, company_name, locations);
    const createdJobs = await Job.create(jobs);
    console.log(`${createdJobs.length} jobs have been successfully created!`);
  } catch (err) {
    console.error("Error creating jobs:", err);
  }
};

const generateLocationHierarchy = (locationData) => {
  return [
    { attribute: "city", hierarchy_level: 4, value: locationData.city },
    { attribute: "county", hierarchy_level: 3, value: locationData.county },
    { attribute: "state", hierarchy_level: 2, value: locationData.state },
    { attribute: "country", hierarchy_level: 1, value: locationData.country },
  ];
};

const jobTitles = [
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "DevOps Engineer",
  "Product Manager",
  "UX/UI Designer",
  "QA Engineer",
  "Cloud Architect",
  "Security Analyst",
  "Mobile Developer",
  "AI/ML Engineer",
  "IT Support Specialist",
  "Database Administrator",
  "Network Engineer",
  "Systems Analyst",
  "Business Analyst",
  "Technical Lead",
  "Scrum Master",
  "Project Manager",
  "Systems Administrator",
];

const generateJobs = (company_id, company_name, locations) => {
  const jobs = [];
  for (let j = 0; j < 20; j++) { // Updated to create 20 jobs per company
    const locationIndex = j % locations.length; // Cycle through locations
    const locationData = locations[locationIndex];
    const jobTitle = jobTitles[j % jobTitles.length]; // Cycle through job titles

    jobs.push({
      company_id,
      company_name,
      location: Object.values(locationData), // Convert location object to array of values
      locationHierarchy: generateLocationHierarchy(locationData),
      reciever_email: `hr@${company_name.toLowerCase().replace(/\s+/g, "")}.com`,
      title: jobTitle,
      description: `This is a ${jobTitle} position at ${company_name}.`,
      salary: `$${(j + 1) * 10000} - $${(j + 1) * 12000}`,
      requirements: ["JavaScript", "Node.js", "React", "MongoDB"],
      responsibilities: ["Develop features", "Fix bugs", "Collaborate with team"],
      work_type: "work",
      employment_type: "permanent",
      categories: ["Technology"],
      active: true,
      views: 0,
    });
  }
  return jobs;
};

module.exports = {
  createMultipleCompanies,
};
