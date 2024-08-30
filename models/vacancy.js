const mongoose = require('mongoose')

const Schema = mongoose.Schema

const jobSchema = new Schema({
    company_id:{
        type: String,
        required: true
    },
    reciever_email:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    salary:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    requirements:{
        type: Array,
        required: true
    },
    responsibilities:{
        type: Array,
        required: true
    },
    work_type:{
        type: String,
        required: true
    },
    categpries:{
        type: Array,
        required: true
    },
    active:{
        type: Boolean,
        required: true
    },
    views:{
        type: Number,
        required: true
    },
},
{timestamps: true})

module.exports = mongoose.model('job', jobSchema)

