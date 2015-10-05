var Parse = require('parse/node');
Parse.initialize(process.env.PARSEAPPID, process.env.PARSEJSKEY);

// Login page
module.exports.login = function(req,res){
  res.render('user/login', {layout: 'login.hbs'});

};

// Logging in process
module.exports.loginProcess = function(req,res){

  Parse.User.logIn(req.body.username, req.body.password, {
    success: function(user) {
      req.session.userid = user.id;
      res.redirect('/');
    },
    error: function(user, error) {
      res.render('user/login', {layout: 'login.hbs', error: error});
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
      res.render('user/signup',{layout: 'login.hbs', error: error});
    }
  });
};


// Logout process
module.exports.logout = function(req,res){
  req.session.destroy();
  res.redirect('/login');
};
