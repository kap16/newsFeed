const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{ type: String },
    password:{ type: String },
    email: { type: String },
    createdOn: { type: Date },
    updatedOn: { type: Date },
    settings: {},
    deleted: { type: Boolean }
});

module.exports = mongoose.model('User', UserSchema);