var Course = require('mongoose').model('Course');

exports.getCourses = function(req, res) {
  console.log("I am in get all of the courses!");
  /*var str = req.params.id;
  console.log(req.params);
  var objectId = str.substring(3,27)
  console.log(objectId);*/
  Course.find({}).exec(function(err, collection) {
    res.send(collection);
  })
};

exports.getCourseById = function(req, res) {
  console.log("In getCourseById");
  var str = req.params.id;
  var objectId = 'ObjectId("' + str.substring(4,28) + '")'
  console.log(objectId);

  Course.findOne(objectId).exec(function(err, course){
    res.send(course);
  });
}
