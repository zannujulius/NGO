const mongoose = require('mongoose')

const causeSchema = new mongoose.Schema({
    title: String,
    image: String,
    goal: Number,
    raise: Number,
    name: String,
    age: Number,
    stateofOrigin: String,
    text: String
})

const Causes = mongoose.model('Cause', causeSchema)

module.exports = Causes;