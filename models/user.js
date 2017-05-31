const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const db = require('../config/db.js');

mongoose.connect(db.url);

// User Schema
const UserSchema = mongoose.Schema({
    fullname: {
      type: String
    },
    username: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    }
});

// model export
const User = module.exports = mongoose.model('User', UserSchema);

module.exports.registerUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) {
        console.log(err);
      }
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}