'use strict';

var express = require('express');
var router = express.Router();

var User = require('../models/user');
var authMiddleware = require('../config/auth');

// USERS

// register a new user
router.post('/register', function(req, res) {
  User.register(req.body, function(err, savedUser){
    res.status(err ? 400 : 200).send(err || savedUser);
  });
});

router.post('/login', function(req, res) {
  User.authenticate(req.body, function(err, user) {
    if(err) return res.status(400).send(err);

    res.cookie('username', user.username);
    res.cookie('userId', user._id.toString());
    res.status(200).send(user);
  });
});

// router.get('/login', authMiddleware, function(req, res) {
//   res.send('TURTLES');
// });
router.get('/login', authMiddleware, function(req, res) {
  console.log('get /users/login');
  //return;
  // User.authenticate(req.body, function(err, user) {
  //   if(err) return res.status(400).send(err);

  //   res.cookie('username', user.username);
  //   res.cookie('userId', user._id.toString());
  //   res.status(200).send(user);
  // });
  res.render('login', {title: 'Welcome'});
});

router.post('/logout', function(req, res){
  //if(err) return res.status(400).send('logout failed');
  res.clearCookie('username');
  res.clearCookie('userId');
  res.status(200).send('logout successful');
});

router.post('/edit/profile', function(req, res){
  //if(err) return res.status(400).send('logout failed');
  console.log(req.body);
  res.clearCookie('username');
  res.clearCookie('userId');
  res.status(200).send('logout successful');
});



module.exports = router;
