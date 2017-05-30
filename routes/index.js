const express = require('express');
const router = express.Router();

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
    console.log('Success!');
    res.redirect('dashbord');                                                                                                                                                                                   
  }

});
/* GET dashbord page. */
router.get('/dashbord', (req, res, next) => {
  res.render('dashbord', { title: 'User Panel', layout: 'dashbord_layout', user: {username:'Archer'} });
});

module.exports = router;
