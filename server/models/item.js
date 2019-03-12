const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    title:{ type: String, required: true},
    link: { type: String },
    pubDate: { type: Date },
    snippet: { type: String },
    description: { type: String },
    content: { type: String },
    guid: { type: Object },
    categories: [{ type: String }],

    // database related info
    flagged: { type: Boolean, default: false },
    favourite: { type: Boolean, default: false },
    read: { type: Boolean, default: false },
    createdOn: { type: Date, required:true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required:true },
    updatedOn: { type: Date },
    source: { type: Schema.Types.ObjectId, ref: 'Source', required:true },
    deleted: { type: Boolean, default: false },
    deletedOn: { type: Date, default: null }
});

module.exports = mongoose.model('Item', ItemSchema);