const mongoose = require('mongoose')

const Schema = mongoose.Schema

const employerSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    companyName:{
        type: String
    },
    fullName:{
        type: String
    },
    contactNumber:{
        type: String
    },
    role:{
        type: String
    }
},
{timestamps: true})

module.exports = mongoose.model('employer', employerSchema)