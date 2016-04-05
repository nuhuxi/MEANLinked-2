angular.module('app').controller('mvSignupCtrl', function($scope, $location, mvUser, mvAuth, mvNotifier){

  $scope.signup = function() {
    var newUserData = {
        username: $scope.email,
        password: $scope.password,
        firstName: $scope.firstName,
        lastName: $scope.lastName
    };

    mvAuth.createUser(newUserData).then(function(){
      mvNotifier.notify('User Account Created!');
      $location.path('/');
    }, function(reason){
      mvNotifier.error(reason);
    });
  }
})
