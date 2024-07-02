const Job = require('../models/JobModel')
const mongoose = require('mongoose')


//create a job
const createJob = async (req, res) => {
    const company_id = req.user._id
    const {company,title,location,shortDescription,description,salary,jobType,noOfCandidates,setUp,duties,requirements} = req.body
    try{
        const job = await Job.create({company, title,company_id,location,shortDescription,description,salary,jobType,noOfCandidates,setUp,duties,requirements})
        res.status(200).json(job)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

//get all jobs from single employer
const getJobsSingleEmployer = async (req, res) =>{
    const company_id = req.user._id
    try{
        const jobs = await Job.find({company_id}).sort({createdAt: -1})
        res.status(200).json(jobs)
        console.log(jobs)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}


//get single job
const getSingleJob = async (req, res) =>{
    const _id = req.params.id
    try{
        const job = await Job.find({_id})
        res.status(200).json(job)
        console.log(job)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

//delete job
const deleteJob = async (req, res) =>{
    const  id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such id'})
    }
    try{
        const job = await Job.findOneAndDelete({_id: id})
        if(!job){
            return res.status(400).json({error: 'no such job'})
        }
        res.status(200).json(job)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}


//get single job
const getSingleJobEmployee = async (req, res) =>{
    const _id = req.params.id
    try{
        const job = await Job.findById(_id)
        res.status(200).json(job)
        console.log(job)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}


module.exports = {
    createJob,
    getJobsSingleEmployer,
    getSingleJob,
    deleteJob,
    getSingleJobEmployee
}