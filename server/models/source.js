const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SourceSchema = new Schema({
    title: { type: String, required: true},
    description: { type: String },
    link: { type: String },

    // database stuff
    createdOn: { type: Date, required: true },
    updatedOn: { type: Date },
    canDelete: { type: Boolean,default: true },
    deleted: { type: Boolean, default: false },
    deletedOn: { type: Date, default: null }
});

module.exports = mongoose.model('Source', SourceSchema);