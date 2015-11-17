'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.cookie('cookiename', 'cookievalue');
  res.render("index", {title: 'Auth'});
});





module.exports = router;
