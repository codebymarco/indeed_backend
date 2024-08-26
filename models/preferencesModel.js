const mongoose = require('mongoose')

const Schema = mongoose.Schema

const prefSchema = new Schema({
    user_id:{
        type: String,
        required: true
    },
    job_id:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
},
{timestamps: true})

module.exports = mongoose.model('preferences', prefSchema)