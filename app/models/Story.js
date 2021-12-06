const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const storySchema = Schema({
    imageLink: { type: String, required: true },
    count: { type: Number, default: 0 },
    viewedBy: [{ name: String }, { timestamps: true }]
}, { timestamps: true });

module.exports = mongoose.model('Story', storySchema)