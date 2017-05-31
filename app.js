const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');

const configDB = require('./config/db.js');


// Routes
const index = require('./routes/index');

var app = express();

// DB connection
mongoose.connect(configDB.url);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('We are connected to the Database!');
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', expressHbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// HTTP request logger middleware for nodejs
app.use(logger('dev'));

// body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// cookie Parser middleware
app.use(cookieParser());

// static files server middleware
app.use(express.static(path.join(__dirname, 'public')));


// middleware for flash messages
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  // the below method doesn't work with handlebars because Javascript expression are not allowed
  // res.locals.messages = require('express-messages')(req, res);
  // next();
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
});

// form validation middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(session({
  secret:'secret',
  resave:false,
  saveUninitialized:true,
  cookie: { secure: true }
}));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
