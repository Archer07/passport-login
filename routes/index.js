var express = require('express');
var router = express.Router();

/* GET Login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login page' });
});

/* GET Register page. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Become a memeber' });
});

/* GET dashbord page. */
router.get('/dashbord', function(req, res, next) {
  res.render('dashbord', { title: 'User Panel', layout: 'dashbord_layout', user: {username:'Archer'} });
});

module.exports = router;
