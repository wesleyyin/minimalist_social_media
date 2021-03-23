const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//picture will be stored in FS with post ID as name
const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    posts: [{type: String, required: true}],//post ID array
    notifications: [{type: String, required: true}],//notification ID array
    bio: {type: Date, required: false}
},{
    timestamps: true,
});


  const User = mongoose.model('User', userSchema);
  module.exports = User;