const Job = require('../models/JobModel')

// Employer Create Job
const EmployerCreateJob = async (req, res) => {
    const company_id = req.user._id
    const {company,title,location,shortDescription,description,salary,jobType,noOfCandidates,setUp,duties,requirements} = req.body
    try{
        const job = await Job.create({company, title,company_id,location,shortDescription,description,salary,jobType,noOfCandidates,setUp,duties,requirements})
        res.status(200).json(job)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

// Employer Get Vacancies
const EmployerGetVacancies = async (req, res) =>{
    const company_id = req.user._id
    try{
        const jobs = await Job.find({company_id}).sort({createdAt: -1})
        res.status(200).json(jobs)
        console.log(jobs)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

// Employer Get Vacancy
const EmployerGetVacancy = async (req, res) =>{
    const _id = req.params.id
    try{
        const job = await Job.findById(_id)
        res.status(200).json(job)
        console.log(job)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

// Employer Get Applicants
const EmployerGetApplicants = async (req, res) =>{
    const company_id = req.user._id
    try{
        const jobs = await Job.find({company_id}).sort({createdAt: -1})
        res.status(200).json(jobs)
        console.log(jobs)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

// Employer Edit Vacancy
const  EmployerEditVacancy = async (req, res) => {
    const _id = req.params.id;
    try {
      const project = await Portfolio.findByIdAndUpdate(_id, {
        ...req.body,
      });
      res.status(200).json({ message: "edited sucessfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// Employer Delete Vacancy
const EmployerDeleteVacancy = async (req, res) =>{
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

// Employer Edit Applicant => reject applicant
const EmployerEditApplicant = async (req, res) => {
    const _id = req.params.id;
    try {
      const project = await Portfolio.findByIdAndUpdate(_id, {
        ...req.body,
      });
      res.status(200).json({ message: "edited sucessfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

module.exports = {

}