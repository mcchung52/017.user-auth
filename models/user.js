'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var User;

var userSchema = Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String },
  avatar: { type: String }
});

userSchema.statics.register = function(user, cb) {
  var username = user.username;
  var password = user.password;
  User.findOne({username: username}, function(err, user){
    if(err || user) return cb(err || 'Username already taken.');
    bcrypt.genSalt(10, function(err1, salt) { //slow hash is security feature; so they can't brute force
      bcrypt.hash(password, salt, function(err2, hash) {
        if(err1 || err2) return cb(err1 || err2);
        var newUser = new User();
        newUser.username = username;
        newUser.password = hash;
        newUser.save(cb);
      });
    });
  });
};

userSchema.statics.authenticate = function (inputUser, cb) {
  User.findOne({username: inputUser.username}, function(err, dbUser) {
    if(err || !dbUser) {
      console.log(dbUser);
      return cb(err || 'Incorrect username or password.');//'User not found');
    }
    bcrypt.compare(inputUser.password, dbUser.password, function(err, isGood) {
      if(err || !isGood) return cb(err || 'Incorrect username or password.');
      dbUser.password = null;
      cb(null, dbUser);
    });
  });
};

User = mongoose.model('User', userSchema);
module.exports = User;
