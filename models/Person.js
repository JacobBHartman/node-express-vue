const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    full_name: String,
    father: String,
    mother: String
});

module.exports = Person = mongoose.model('Person', personSchema);