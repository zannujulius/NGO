const mongoose = require('mongoose')

const causeSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    goal: Number,
    raise: Number
})

const Cause = mongoose.model('Cause', causeSchema)

module.exports = Cause;