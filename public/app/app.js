angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
	var routeRuleChecks = {
		admin: {
			auth: function(mvAuth) {
				return mvAuth.authorizeCurrentUserForRoute('admin');
			}
		}
	}

	$locationProvider.html5Mode(true);
	$routeProvider
		.when('/', {templateUrl: '/partials/main/main', controller: 'mvMainCtrl'})
		.when('/admin/users', {templateUrl: '/partials/admin/user-list',
			controller: 'mvUserListCtrl', resolve: routeRuleChecks.admin
		});
});

angular.module('app').run(function($rootScope, $location) {
	$rootScope.$on('$routeChangeError', function(evt, current, previous, rejection){
		if(rejection === 'not authorized'){
			$location.path('/');
		}
	})
})
