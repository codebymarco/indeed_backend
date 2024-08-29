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
    saved:{
        type: Array,
        required: true
    },
    hidden:{
        type: Array,
        required: true
    },
},
{timestamps: true})

module.exports = mongoose.model('preferences', prefSchema)