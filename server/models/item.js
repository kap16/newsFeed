const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    title:{ type: String, required: true},
    link: { type: String },
    pubDate: { type: Date },
    creator: { type: String },
    content: { type: String },
    contentSnippet: { type: String },
    guid: { type: String },
    categories: [{ type: String }],
    isoDate: { type: Date },

    // database related info
    flagged: { type: Boolean, default: false },
    favourite: { type: Boolean, default: false },
    createdOn: { type: Date, required:true },
    updatedOn: { type: Date },
    source: { type: String},
    deleted: { type: Boolean, default: false },
    deletedOn: { type: Date, default: null }
});

module.exports = mongoose.model('Item', ItemSchema);