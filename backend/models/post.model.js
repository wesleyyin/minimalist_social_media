const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//picture will be stored in FS with post ID as name
const postSchema = new Schema({
    username: {type: String, required: true},
    caption: {type: String, required: true},
    date: {type: Date, required: true}
},{
    timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;