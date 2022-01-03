const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    date: Date,
    friends: Array

});

module.exports = mongoose.model('Users', UserSchema); 