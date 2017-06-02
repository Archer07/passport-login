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

// functions to be created
// getByUsername, comparePass, getById



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

module.exports.getByUsername = (username, callback) => {
  // db query
  const query = {username: username};
  User.findOne(query, callback);
}

module.exports.getById = (id, callback) => {
  User.findById(id, callback);
}

module.exports.comparePass = (pass, hash, callback) => {
  bcrypt.compare(pass, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
}
