const mongoose = require('mongoose');

const Newsletter = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Newsletter', Newsletter);