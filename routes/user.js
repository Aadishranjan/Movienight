const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

mongoose.connect('mongodb+srv://Aadish:0cOLg4tC9DxXG1Ux@cluster0.rzrzpcy.mongodb.net/websitedb')

// Define the schema for the user
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
});

userSchema.plugin(plm, { usernameField: 'username' });

//create User model
module.exports = mongoose.model('User', userSchema);
