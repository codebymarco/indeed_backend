const mongoose = require('mongoose')

const Schema = mongoose.Schema

const employeePortfolioSchema = new Schema({
    user_id:{
        type: String,
        required: true
    },
    surname:{
        type: String    },
    name:{
        type: String    },
    occupation:{
        type: String    },
    age:{
        type: String    },
    location:{
        type: String    },
    about:{
        type: String    },
    website:{
        type: String    },
    skills:{
        type: Array    },
    contact_no:{
        type: String    },
    active:{
        type: Boolean    },
    recruiter_type:{
        type: String    },
    views:{
        type: Number,
        required: true
    },
},
{timestamps: true})

module.exports = mongoose.model('employeePortfolio', employeePortfolioSchema)

