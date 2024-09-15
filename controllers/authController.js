const Portfolio = require("../models/employeePortfolio");
const EmployerPortfolio = require("../models/employerPortfolio");
const Resume = require("../models/resume");
const Job = require("../models/vacancy");
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
      surname: "",
      name: "",
      location: "", // Assuming a default value for location
      age: "", // Assuming a default value for location
      occupation: "", // Assuming a default value for location
      about: "",
      website: "",
      skills: [], // Assuming some default skills
      contact_no: "", // Assuming a default contact number
      active: true,
      recruiter_type: "", // Assuming a default recruiter type
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
      photo: "", // Assuming a default path for the resume
      user_id: user._id,
      deleted: false,
      mimetype: "", // Assuming PDF as the default mimetype
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
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      throw Error("Please fill in email and password and name");
    }

    const existsemail = await Employer.findOne({ email });
    const existsname = await Employer.findOne({ name });

    if (existsemail) {
      throw Error("Email already exists");
    }

    if (existsname) {
      throw Error("Name already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create User
    const user = await Employer.create({ email, password: hash, name });

    // Create Portfolio for User
    const portfolio = await EmployerPortfolio.create({
      user_id: user._id.toString(), // Use the user's ID for company_id
      photo: "", // Assuming a default photo URL
      name: name, // Assuming a default name
      location: [], // Assuming a default value for location
      locationHierarchy: [], // Assuming a default value for location
      work_force: "", // Assuming a default work force range
      website: "",
      hr_emails: [], // Assuming a default HR email
      contact_no: [], // Assuming a default contact number
      active: true,
      recruiter_type: "", // Assuming a default recruiter type
      views: 0,
    });

    /*     const job = await Job.create({
      company_id: user._id.toString(), // Use the user's ID for company_id
      company_name: name, // Assuming a default company name
      location: "", // Assuming a default value for location
      reciever_email: email, // Assuming a default receiver email
      title: "", // Assuming a default job title
      description: "", // Assuming a default job description
      salary: "", // Assuming a default salary
      requirements: [], // Assuming default requirements (empty array)
      responsibilities: [], // Assuming default responsibilities (empty array)
      work_type: "", // Assuming a default work type
      employment_type: "", // Assuming a default employment type
      categories: [], // Assuming default categories (empty array)
      active: true, // Active by default
      views: 0 // Initial views set to 0
    }); */

    // Example usage:
    const company_id = user._id.toString(); // Dynamic company_id
    const company_name = name; // Dynamic company_name
    const location = [
      "Galerie des Rois",
      "6",
      "Parvis Notre-Dame - Place Jean-Paul II",
      "Quartier Les Îles",
      "4th Arrondissement",
      "Paris",
      "Paris",
      "FR-75C",
      "Ile-de-France",
      "FR-IDF",
      "Metropolitan France",
      "75004",
      "France",
      "fr",
    ];
    const locationHierarchy = [
      {
        attribute: "tourism",
        hierarchy_level: 17,
        value: "Galerie des Rois",
      },
      {
        attribute: "house_number",
        hierarchy_level: 14,
        value: "6",
      },
      {
        attribute: "road",
        hierarchy_level: 9,
        value: "Parvis Notre-Dame - Place Jean-Paul II",
      },
      {
        attribute: "city_block",
        hierarchy_level: 15,
        value: "Quartier Les Îles",
      },
      {
        attribute: "suburb",
        hierarchy_level: 5,
        value: "4th Arrondissement",
      },
      {
        attribute: "city_district",
        hierarchy_level: 8,
        value: "Paris",
      },
      {
        attribute: "city",
        hierarchy_level: 4,
        value: "Paris",
      },
      {
        attribute: "state",
        hierarchy_level: 2,
        value: "Ile-de-France",
      },
      {
        attribute: "postcode",
        hierarchy_level: 18,
        value: "75004",
      },
      {
        attribute: "country",
        hierarchy_level: 1,
        value: "France",
      },
      {
        attribute: "country_code",
        hierarchy_level: 20,
        value: "fr",
      },
    ];
    createJobs(company_id, company_name, location, locationHierarchy);

    // Create JWT Token
    const token = createToken(user._id);

    res.status(200).json({
      user,
      token,
      portfolio,
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

const createJobs = async (
  company_id,
  company_name,
  location,
  locationHierarchy
) => {
  try {
    const jobs = generateJobs(
      company_id,
      company_name,
      location,
      locationHierarchy
    );

    // Use the Job.create method to insert the array of jobs into the database
    const createdJobs = await Job.create(jobs);

    console.log(`${createdJobs.length} jobs have been successfully created!`);
  } catch (err) {
    console.error("Error creating jobs:", err);
  }
};

const generateJobs = (
  company_id,
  company_name,
  location,
  locationHierarchy
) => {
  return [
    {
      company_id,
      company_name,
      location,
      locationHierarchy,
      reciever_email: "hr@techinnovators.com",
      title: "Software Engineer",
      description:
        "Develop and maintain web applications using modern frameworks.",
      salary: "$100,000 - $120,000",
      requirements: ["JavaScript", "Node.js", "React", "MongoDB"],
      responsibilities: [
        "Develop features",
        "Fix bugs",
        "Collaborate with team",
      ],
      work_type: "work",
      employment_type: "permanent",
      categories: ["Technology"],
      active: true,
      views: 0,
    },
    {
      company_id,
      company_name,
      location,
      locationHierarchy,

      reciever_email: "hr@techinnovators.com",
      title: "Data Analyst",
      description: "Analyze company data and provide insights to stakeholders.",
      salary: "$80,000 - $95,000",
      requirements: ["SQL", "Python", "Data Visualization", "Tableau"],
      responsibilities: [
        "Analyze datasets",
        "Create reports",
        "Collaborate with departments",
      ],
      work_type: "work",
      employment_type: "permanent",
      categories: ["Data"],
      active: true,
      views: 0,
    },
    {
      company_id,
      company_name,
      location,
      locationHierarchy,

      reciever_email: "hr@techinnovators.com",
      title: "Project Manager",
      description:
        "Lead projects from inception to completion, ensuring timelines are met.",
      salary: "$90,000 - $110,000",
      requirements: ["Agile Methodologies", "Leadership", "Communication"],
      responsibilities: [
        "Manage project teams",
        "Ensure timely delivery",
        "Report progress",
      ],
      work_type: "work",
      employment_type: "permanent",
      categories: ["Management"],
      active: true,
      views: 0,
    },
    {
      company_id,
      company_name,
      location,
      locationHierarchy,

      reciever_email: "hr@techinnovators.com",
      title: "DevOps Engineer",
      description:
        "Implement and manage CI/CD pipelines and cloud infrastructure.",
      salary: "$110,000 - $130,000",
      requirements: ["AWS", "Docker", "Kubernetes", "CI/CD"],
      responsibilities: [
        "Maintain infrastructure",
        "Automate processes",
        "Ensure reliability",
      ],
      work_type: "work",
      employment_type: "permanent",
      categories: ["Technology"],
      active: true,
      views: 0,
    },
    {
      company_id,
      company_name,
      location,
      locationHierarchy,

      reciever_email: "hr@techinnovators.com",
      title: "UX/UI Designer",
      description:
        "Design user-centered interfaces for web and mobile applications.",
      salary: "$85,000 - $100,000",
      requirements: ["Figma", "Sketch", "Prototyping", "User Research"],
      responsibilities: [
        "Create wireframes",
        "Conduct user testing",
        "Collaborate with developers",
      ],
      work_type: "work",
      employment_type: "permanent",
      categories: ["Design"],
      active: true,
      views: 0,
    },
    {
      company_id,
      company_name,
      location,
      locationHierarchy,

      reciever_email: "hr@techinnovators.com",
      title: "Marketing Specialist",
      description:
        "Plan and execute marketing strategies to promote company products.",
      salary: "$70,000 - $85,000",
      requirements: [
        "SEO",
        "Google Analytics",
        "Content Creation",
        "Social Media",
      ],
      responsibilities: [
        "Manage campaigns",
        "Analyze performance",
        "Optimize strategies",
      ],
      work_type: "work",
      employment_type: "permanent",
      categories: ["Marketing"],
      active: true,
      views: 0,
    },
  ];
};

module.exports = {
  loginEmployee,
  loginEmployer,
  createEmployee,
  createEmployer,
};
