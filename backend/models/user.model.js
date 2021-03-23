const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//picture will be stored in FS with post ID as name
const userSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    posts: [{type: String, required: true}],//post ID array
    notifications: [{type: String, required: true}],//notification ID array
    bio: {type: Date, required: false}
},{
    timestamps: true,
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };
  
  // checking if password is valid
  userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  const User = mongoose.model('User', userSchema);
  module.exports = User;