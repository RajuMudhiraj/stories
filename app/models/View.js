const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const viewSchema = Schema({
    viewedBy: [{
        name: String,
        time: Date
    }],
}, { timestamps: true });

module.exports = mongoose.model('View', viewSchema)