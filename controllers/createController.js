const Employer = require("../models/employer");
const Portfolio = require("../models/employerPortfolio");
const Job = require("../models/vacancy");
const bcrypt = require("bcrypt");

// Create multiple companies
const createMultipleCompanies = async (req, res) => {
  try {
    const companies = [];
    
    for (let i = 1; i <= 20; i++) {
      // Generate unique company name, email, and password
      const name = `company${i}`;
      const password = `pass${i}`;
      const email = `email${i}@company.com`;

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const user = await Employer.create({ email, password: hash, name });

      const portfolio = await Portfolio.create({
        user_id: user._id.toString(), // Use the user's ID for company_id
        photo: "https://example.com/photo.jpg", // Assuming a default photo URL
        name: name, // Dynamic name
        location: "Durban", // Assuming a default value for location
        work_force: `${20 + i}`, // Dynamic work force range
        website: `https://company${i}.com`, // Dynamic website
        hr_emails: [`hr${i}@company.com`, `info${i}@company.com`], // Dynamic HR emails
        contact_no: [`123456${i}`, `7891011${i}`], // Dynamic contact numbers
        active: true,
        recruiter_type: "company", // Default recruiter type
        views: 0,
      });

      const company_id = user._id.toString();
      const company_name = name;

      // Create two jobs for each company
      await createJobs(company_id, company_name);
      
      companies.push({ user, portfolio });
    }

    res.status(200).json({ companies });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error.message);
  }
};

const createJobs = async (company_id, company_name) => {
  try {
    const jobs = generateJobs(company_id, company_name);

    // Use the Job.create method to insert the array of jobs into the database
    const createdJobs = await Job.create(jobs);

    console.log(`${createdJobs.length} jobs have been successfully created for ${company_name}!`);
  } catch (err) {
    console.error("Error creating jobs:", err);
  }
};

const generateJobs = (company_id, company_name) => {
  return [
    {
      company_id,
      company_name,
      location: [
        "Che Guevara Road",
        "Greyville",
        "Durban",
        "eThekwini Metropolitan Municipality",
        "KwaZulu-Natal",
        "ZA-KZN",
        "4057",
        "South Africa",
        "za",
      ],
      locationHierarchy: [
        {
          attribute: "road",
          hierarchy_level: 9,
          value: "Che Guevara Road",
        },
        {
          attribute: "suburb",
          hierarchy_level: 5,
          value: "Greyville",
        },
        {
          attribute: "city",
          hierarchy_level: 4,
          value: "Durban",
        },
        {
          attribute: "county",
          hierarchy_level: 3,
          value: "eThekwini Metropolitan Municipality",
        },
        {
          attribute: "state",
          hierarchy_level: 2,
          value: "KwaZulu-Natal",
        },
        {
          attribute: "postcode",
          hierarchy_level: 18,
          value: "4057",
        },
        {
          attribute: "country",
          hierarchy_level: 1,
          value: "South Africa",
        },
        {
          attribute: "country_code",
          hierarchy_level: 20,
          value: "za",
        },
      ],
      reciever_email: "hr@techinnovators.com",
      title: "Software Engineer",
      description: "Develop and maintain web applications using modern frameworks.",
      salary: "$100,000 - $120,000",
      requirements: ["JavaScript", "Node.js", "React", "MongoDB"],
      responsibilities: ["Develop features", "Fix bugs", "Collaborate with team"],
      work_type: "work",
      employment_type: "permanent",
      categories: ["Technology"],
      active: true,
      views: 0,
    },

    {
      company_id,
      company_name,
      location: [
        "New York City Hall",
        "260",
        "Broadway",
        "Lower Manhattan",
        "Civic Center",
        "Manhattan",
        "New York County",
        "New York",
        "New York",
        "US-NY",
        "10000",
        "United States",
        "us",
      ],
      locationHierarchy: [
        {
          attribute: "amenity",
          hierarchy_level: 16,
          value: "New York City Hall",
        },
        {
          attribute: "house_number",
          hierarchy_level: 14,
          value: "260",
        },
        {
          attribute: "road",
          hierarchy_level: 9,
          value: "Broadway",
        },
        {
          attribute: "quarter",
          hierarchy_level: 7,
          value: "Lower Manhattan",
        },
        {
          attribute: "neighbourhood",
          hierarchy_level: 6,
          value: "Civic Center",
        },
        {
          attribute: "suburb",
          hierarchy_level: 5,
          value: "Manhattan",
        },
        {
          attribute: "county",
          hierarchy_level: 3,
          value: "New York County",
        },
        {
          attribute: "city",
          hierarchy_level: 4,
          value: "New York",
        },
        {
          attribute: "state",
          hierarchy_level: 2,
          value: "New York",
        },
        {
          attribute: "postcode",
          hierarchy_level: 18,
          value: "10000",
        },
        {
          attribute: "country",
          hierarchy_level: 1,
          value: "United States",
        },
        {
          attribute: "country_code",
          hierarchy_level: 20,
          value: "us",
        },
      ],
      reciever_email: "hr@techinnovators.com",
      title: "Software Engineer",
      description: "Develop and maintain web applications using modern frameworks.",
      salary: "$100,000 - $120,000",
      requirements: ["JavaScript", "Node.js", "React", "MongoDB"],
      responsibilities: ["Develop features", "Fix bugs", "Collaborate with team"],
      work_type: "work",
      employment_type: "permanent",
      categories: ["Technology"],
      active: true,
      views: 0,
    },
  ];
};

module.exports = {
  createMultipleCompanies,
};
