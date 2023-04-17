const mongoose = require('mongoose');

const CourserSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    price: Number,
    rating: Number
});


module.exports = mongoose.model('Course', CourserSchema);