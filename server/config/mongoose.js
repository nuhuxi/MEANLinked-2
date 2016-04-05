var mongoose = require('mongoose'),
	crypto = require('crypto');

module.exports = function(config){
	mongoose.connect(config.db);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error...'));
	db.once('open', function callback(){
		console.log('multivision db opened');
	});

	var userSchema = mongoose.Schema({
		firstName: String,
		lastName: String,
		username: String,
		salt: String,
		hashed_pwd: String,
		roles: [String]
	});

	userSchema.methods = {
		authenticate: function(passwordToMatch){
			return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
		}
	};
	var User = mongoose.model('User', userSchema);

	User.find({}).exec(function(err, collection){
		if(collection.length === 0){
			var salt, hash;

			salt = createSalt();
			hash = hashPwd(salt, 'mark');
			User.create({firstName:'Mark', lastName: 'Keckeis', username: 'mark', salt: salt, hashed_pwd: hash, roles: ['admin']});

			salt = createSalt();
			hash = hashPwd(salt, 'mardi');
			User.create({firstName:'Mardi', lastName: 'Keckeis', username: 'mardi', salt: salt, hashed_pwd: hash, roles: []});
			salt = createSalt();
			hash = hashPwd(salt, 'luke');
			User.create({firstName:'Luke', lastName: 'Keckeis', username: 'luke', salt: salt, hashed_pwd: hash});

			salt = createSalt();
			hash = hashPwd(salt, 'max');
			User.create({firstName:'Max', lastName: 'Keckeis', username: 'max', salt: salt, hashed_pwd: hash});

			salt = createSalt();
			hash = hashPwd(salt, 'grace');
			User.create({firstName:'Grace', lastName: 'Keckeis', username: 'grace', salt: salt, hashed_pwd: hash});
		}
	});
};

function createSalt(){
	return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd) {
  var hmac = crypto.createHmac('sha1', salt);
  hmac.setEncoding('hex');
  hmac.write(pwd);
  hmac.end();
  return hmac.read();
}
/*
// This is the code he says is deprecated
function hashPwd(salt, pwd) {
	var hmac = crypto.createHmac('sha1', salt);
	return hmac.update(pwd).digest('hex');

}
*/
