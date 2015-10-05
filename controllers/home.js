var Parse = require('parse/node');
Parse.initialize(process.env.PARSEAPPID, process.env.PARSEJSKEY);

// Home page
module.exports.index = function(req,res){
  res.render('home/index');
};
