const mongoose = require('mongoose')
const Employer = require('./employerModel')

const Schema = mongoose.Schema

const jobSchema = new Schema({
    company:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    company_id:{
        type: String,
    },
    location:{
        type: String,
    },
    shortDescription:{
        type: String,
    },
    description:{
        type: String,
    },
    salary:{
        type: String,
    },
    jobType:{
        type: String,
    },
    noOfCandidates:{
        type: String,
    },
    setUp:{
        type: String,
    },
    duties:{
        type: Array,
    },
    requirements:{
        type: Array,
    },
    category:{
        type: Array,
    }
},
{timestamps: true})

module.exports = mongoose.model('job', jobSchema)

