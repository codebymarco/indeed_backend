const mongoose = require('mongoose')

const Schema = mongoose.Schema

const applicantSchema = new Schema({
    user_id:{
        type: String,
        required: true
    },
    job_id:{
        type: String,
        required: true
    },
    company_id:{
        type: String,
    },
},
{timestamps: true})

module.exports = mongoose.model('applicants', applicantSchema)

