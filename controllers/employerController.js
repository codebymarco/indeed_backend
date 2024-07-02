const Employer = require('../models/employerModel')
const mongoose = require('mongoose')



//get single employer
const getSingleEmployer = async (req, res) =>{
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