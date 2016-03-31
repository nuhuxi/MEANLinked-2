var path = require('path');
var rootPath = path.normalize(__dirname +'/../../');


module.exports = {

	development: {
		rootPath: rootPath,
		db: 'mongodb://localhost/multivision',
		port:		process.env.PORT || 3030
	}, 
	production: {
		rootPath: rootPath,
		db: 'mongodb://mkeckeis:friess2015@ds025439.mlab.com:25439/meanv2-multivision',
		port: process.env.PORT || 80


	}
};