const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const View = require('./View')

const storySchema = Schema({
    imageLink: { type: String, required: true },
    viewedBy:[{type: Schema.Types.ObjectId, ref:"View"}]
}, { timestamps: true });

module.exports = mongoose.model('Story', storySchema)