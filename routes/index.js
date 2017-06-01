const express = require('express');
const passport = require('passport');
const localStartegy = require('passport-local').Strategy;
const router = express.Router();

const User = require('../models/user.js');

/* GET Login page. */
router.get('/', (req, res, next) => {
  res.render('login', { title: 'Login page' });
});

/* GET Register page. */
router.get('/register',(req, res, next) => {
  res.render('register', { title: 'Become a memeber' });
});

/* POST request for registration */
router.post('/register', (req, res, next) => {
  const Fname = req.body.Fname;
  const username = req.body.username;
  const email = req.body.email;
  const password1 = req.body.password1;
  const password2 = req.body.password2;

  // data validation with expressValidator
  req.checkBody('Fname', 'Name field is required').notEmpty();
  req.checkBody('username', 'Username field is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email must be a valid address').isEmail();
  req.checkBody('password1', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords must match').equals(password1);

  let errors = req.validationErrors();

  if (errors) {
    res.render('register', {errors: errors});
  } else {
    const newUser = new User({
      fullname: Fname,
      username: username,
      email: email,
      password: password1
    });
    User.registerUser(newUser, (err, user) => {
      if (err) throw err;
      req.flash('success_msg', 'You are registered and can log in');
      res.redirect('/');
    });
  }

});
// Local strategy
passport.use(new localStartegy( (username, password, done) => {

}));

// Login processing
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashbord',
    failureRedirect: '/',
    failureFlash: true
  }, (req, res) => {
    res.redirect('/');
  });
});

/* GET dashbord page. */
router.get('/dashbord', (req, res, next) => {
  res.render('dashbord', { title: 'User Panel', layout: 'dashbord_layout', user: {username:'Archer'} });
});

module.exports = router;
