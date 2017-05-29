var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login page' });
});

/* GET home page. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Become a memeber' });
});

module.exports = router;
