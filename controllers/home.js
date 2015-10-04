var Parse = require('parse/node');
Parse.initialize(process.env.PARSEAPPID, process.env.PARSEJSKEY);

// Home page
module.exports.index = function(req,res){
  var currentUser = Parse.User.current();
  if (currentUser) {
    res.redirect('home/index');
  } else {
    res.redirect('/login');
  }
};
