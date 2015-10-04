// Dependencies
var express = require('express');
var	app = express();
var bodyParser = require('body-parser');

// Check for AWS Elastic Beanstalk environment value
if ( process.env.LOCALHOST == null){
  // If it's not set that means we are running localhost
  // Used to check whether or not to inlcude localhost config file
  process.env.LOCALHOST = true;
}

// Access the body posts content
app.use(bodyParser.urlencoded({ extended: false }));

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
app.get('/', home.index);
app.post('/login', user.loginProcess);
app.get('/login', user.login);
app.post('/signup', user.signupProcess);
app.get('/signup', user.signup);

app.listen(port);
