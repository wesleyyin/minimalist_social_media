const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//picture will be stored in FS with post ID as name
const connectionSchema = new Schema({
    userA: {type: String, required: true},
    userB: {type: String, required: true},
    status: {
        type: String,
        enum : ['pending','connected'],
        default: 'pending'
    },
},{
    timestamps: true,
});

const Connection = mongoose.model('Connection', connectionSchema);

module.exports = Connection;