const mongoose = require('mongoose')

const Schema = mongoose.Schema

const employerSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
},
{timestamps: true})

module.exports = mongoose.model('employer', employerSchema)