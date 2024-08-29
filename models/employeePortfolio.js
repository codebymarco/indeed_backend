const mongoose = require('mongoose')

const Schema = mongoose.Schema

const employeePortfolioSchema = new Schema({
    user_id:{
        type: String,
        required: true
    },
    surname:{
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
    about:{
        type: String,
        required: true
    },
    website:{
        type: String,
        required: true
    },
    skills:{
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

module.exports = mongoose.model('employeePortfolio', employeePortfolioSchema)

