var mongoose = require('mongoose'),
  encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
  firstName: {type: String, required: '{PATH} is required!'},
  lastName: {type: String, required: '{PATH} is required!'},
  username: {
    type: String,
    required: '{PATH} is required!',
    unique: true
  },
  salt: {type: String, required: '{PATH} is required!'},
  hashed_pwd: {type: String, required: '{PATH} is required!'},
  roles: [String]
});

userSchema.methods = {
  authenticate: function(passwordToMatch){
    return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
  },
  hasRole: function(role) {
    return this.roles.indexOf(role) > -1;
  }
};
var User = mongoose.model('User', userSchema);
function createDefaultUsers() {
  User.find({}).exec(function(err, collection){
    if(collection.length === 0){
      var salt, hash;

      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'mark');
      User.create({firstName:'Mark', lastName: 'Keckeis', username: 'mark', salt: salt, hashed_pwd: hash, roles: ['admin']});

      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'mardi');
      User.create({firstName:'Mardi', lastName: 'Keckeis', username: 'mardi', salt: salt, hashed_pwd: hash, roles: []});
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'luke');
      User.create({firstName:'Luke', lastName: 'Keckeis', username: 'luke', salt: salt, hashed_pwd: hash});

      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'max');
      User.create({firstName:'Max', lastName: 'Keckeis', username: 'max', salt: salt, hashed_pwd: hash});

      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'grace');
      User.create({firstName:'Grace', lastName: 'Keckeis', username: 'grace', salt: salt, hashed_pwd: hash});
    }
  });
}
exports.createDefaultUsers = createDefaultUsers;
