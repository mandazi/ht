var Parse = require('parse/node');
var config = require('../config');

Parse.initialize(process.env.PARSEAPPID || config.parse.appid, process.env.PARSEJSKEY || config.parse.jskey);

// Home page
module.exports.index = function(req,res){
  var currentUser = Parse.User.current();
  if (currentUser) {
    res.render('home/index');
  } else {
    res.redirect('/login');
  }
};
