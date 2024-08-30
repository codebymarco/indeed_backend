const Portfolio = require("../models/employeePortfolio");
const Resume = require("../models/resume");
const Preferences = require("../models/preferences");

const createPortfolioInDB = async (user_id, portfolioData) => {
  try {
    const portfolio = await Portfolio.create({
      user_id,
      ...portfolioData,
    });

    return portfolio;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createResumeInDB = async (user_id, portfolioData) => {
  try {
    const portfolio = await Resume.create({
      user_id,
      ...portfolioData,
    });

    return portfolio;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createPreferencesInDB = async (user_id, portfolioData) => {
  try {
    const portfolio = await Preferences.create({
      user_id,
      ...portfolioData,
    });

    return portfolio;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createPortfolioInDB,
  createResumeInDB,
  createPreferencesInDB,
};
