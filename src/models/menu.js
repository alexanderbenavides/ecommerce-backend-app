const mongoose = require('mongoose');

const MenuSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true 
    },
    icon: {
        type: String,
        required: true 
    },
    order: {
        type: Number,
        unique: true
    },
    active: Boolean
});

module.exports = mongoose.model('Menu', MenuSchema);