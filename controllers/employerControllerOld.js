const Employer = require('../models/employer')

// get employer
const getEmployer = async (req, res) =>{
    const employerId = req.user._id
    try{
        const employer = await Employer.findById({employerId})
        if(!employer){
            return res.status(400).json({error: 'no such employer'})
        }
        res.status(200).json(employer)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

//get single employer
const getEmployerPortfolio = async (req, res) =>{
    const employerId = req.user._id
    try{
        const employer = await Employer.findById({employerId})
        if(!employer){
            return res.status(400).json({error: 'no such employer'})
        }
        res.status(200).json(employer)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

//get single employer
const EmployerUpdatePortfolioWithoutPhoto = async (req, res) =>{
    const employerId = req.user._id
    try{
        const employer = await Employer.findById({employerId})
        if(!employer){
            return res.status(400).json({error: 'no such employer'})
        }
        res.status(200).json(employer)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}


module.exports = {
    getSingleEmployer
}