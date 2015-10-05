// Dependencies
var express = require('express');
var	app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var Parse = require('parse/node');

// Check if we are on on AWS or not
if (process.env.AWS == null || !process.env.AWS) {
  // get the process environment variables for localhost
  var config = require('./config');
}

// Access the body posts content
app.use(bodyParser.urlencoded({ extended: false }));

// Setup session
app.use(session({
  secret:process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: true
}))

// Check if user is logged in method
var authorize = function (req,res, next){
  if ( req.session && req.session.userid ){
    var query = new Parse.Query(Parse.User);
    query.get(req.session.userid, {
      success: function(user) {
        req.session.user = user;
        return next();
      },
      error: function(user, error) {
        return res.redirect('/login');
      }
    });
  } else {
    return res.redirect('/login');
  }
};

// Check if user is not logged
var unauthorize = function (req,res, next){
  if ( req.session && req.session.userid ){
    return res.redirect('/');
  } else {
    return next();
  }
};

// Handlebars view engine setup
var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs({defaultLayout: 'single', extname: '.hbs'}));
app.set('view engine', '.hbs');

// define the port
var port = process.env.PORT || 8080;

// Controllers
var home = require('./controllers/home');
var user = require('./controllers/user');

// Routes
app.get('/', authorize,  home.index);
app.get('/login', unauthorize, user.login);
app.post('/login', user.loginProcess);
app.get('/signup', unauthorize, user.signup);
app.post('/signup', user.signupProcess);
app.get('/logout', authorize, user.logout);

app.listen(port);
