const mongoose = require('mongoose')

const Schema = mongoose.Schema

const companyPortfolioSchema = new Schema({
    company_id:{ // reference to user_id
        type: String,
        required: true
    },
    photo:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    work_force:{
        type: String,
        required: true
    },
    website:{
        type: String,
        required: true
    },
    hr_emails:{
        type: Array,
        required: true
    },
    contact_no:{
        type: Array,
        required: true
    },
    active:{
        type: Boolean,
        required: true
    },
    recruiter_type:{
        type: String,
        required: true
    },
    views:{
        type: Number,
        required: true
    },
},
{timestamps: true})

module.exports = mongoose.model('companyPortfolio', companyPortfolioSchema)

