var User = require('mongoose').model('User'),
  encrypt = require('../utilities/encryption');


exports.getUsers = function(req, res) {
  User.find({}).exec(function(err, collection) {
    res.send(collection);
  })
}

exports.createUser = function(req, res, next) {
  var userData = req.body;
<<<<<<< HEAD
=======
  userData.username = userData.username.toLowerCase();
>>>>>>> clientSideTesting
  userData.salt = encrypt.createSalt();
  userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);
  User.create(userData, function(err, user){

    if(err) {
      if(err.toString().indexOf('E11000') > -1) {
        err = new Error('Duplicate Username');
<<<<<<< HEAD
      }
      res.status(400);
      return res.send({reason: err.toString});
=======
        console.log("The error is " + err);
      }
      res.status(400);
      return res.send({reason: err.toString()});
>>>>>>> clientSideTesting
    }
    req.logIn(user, function(err) {
      if(err) {return next(err)};
      res.send(user);
    })
  })

}
