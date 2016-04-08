angular.module('app').controller('mvCourseDetailCtrl', function($scope, mvCachedCourses, $routeParams){
  mvCachedCourses.query().$promise.then(function(collection){
    if(course._id === $routeParams.id){
      $scope.course = course;
    }
  })
})
