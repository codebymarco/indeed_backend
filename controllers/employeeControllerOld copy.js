const User = require('../models/userModel')
const PdfRes = require('../models/pdfModel')
const mongoose = require('mongoose')

//get employee
const getSingleEmployee = async (req, res) =>{
    const employeeId = req.user._id
    try{
        const employee = await User.findById({employeeId})
        if(!employee){
            return res.status(400).json({error: 'no such employee'})
        }
        res.status(200).json(employee)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

// delete employee
const deleteEmployee = async (req, res) =>{
    const employeeId = req.user._id
    try{
        const employee = await User.findOneAndDelete({_id: employeeId})
        if(!employee){
            return res.status(400).json({error: 'no such employee'})
        }
        res.status(200).json(employee)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

// delete resume
const deleteCv = async (req, res) =>{
    const employeeId = req.user._id
    try{
        const cv = await PdfRes.findOneAndDelete({user_id: employeeId})
        if(!cv){
            return res.status(400).json({error: 'no cv for this user'})
        }
        res.status(200).json(cv)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

// edit portofolio

// save or hide job

// get user preferences

// get applications

// apply

// reject 

module.exports = {
    getSingleEmployee,
    deleteEmployee,
    deleteCv
}