var Parse = require('parse/node');
var config = require('../config');

Parse.initialize(process.env.PARSEAPPID || config.parse.appid, process.env.PARSEJSKEY || config.parse.jskey);

// Login page
module.exports.login = function(req,res){

  res.render('user/login', {layout: 'login.hbs'});

};

// Logging in process
module.exports.loginProcess = function(req,res){

  Parse.User.logIn(req.body.username, req.body.password, {
    success: function(user) {
      res.render('home/index');
    },
    error: function(user, error) {
      res.render('user/login', error, {layout:'login.hbs'});
    }
  });

};


// Registration page
module.exports.signup = function(req,res){

  res.render('user/signup', {layout: 'login.hbs'});

};

// Registration process
module.exports.signupProcess = function(req,res){

  var user = new Parse.User();
  user.set("username", req.body.username);
  user.set("password", req.body.password);
  user.set("email", req.body.email);

  user.signUp(null, {
    success: function(user) {
      res.redirect('/');
    },
    error: function(user, error) {
      // Show the error message somewhere and let the user try again.
      alert("Error: " + error.code + " " + error.message);
      res.render('user/signup',error,{layout: 'login.hbs'});
    }
  });
};


// Logout process
module.exports.logout = function(req,res){
  Parse.User.logOut();
  res.redirect('/login');
};
