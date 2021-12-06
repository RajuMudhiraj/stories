const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const viewSchema = Schema({
    storyId: {type: Schema.Types.ObjectId, ref:"Story", required:true},
    viewedBy: [{
        name: String,
        time: Date
    }],
}, { timestamps: true });

module.exports = mongoose.model('View', viewSchema)