var App = angular.module('wall', [
	'ngRoute',
	'ngAnimate',
	'ngCookies',
	'angularLocalStorage',
	'ui.bootstrap'
])
.config(function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/home', {
		templateUrl: 'assets/views/home.html',
		controller: 'homeCtrl'
	})
	.when('/password/:code/', {
		templateUrl: 'assets/views/password.html',
		controller: 'passwordCtrl'
	})
	.when('/app/:code/', {
		templateUrl: 'assets/views/app.html',
		controller: 'wallCtrl'
	})
	.when('/app/:code/card/:card', {
		templateUrl: 'assets/views/app.html',
		controller: 'wallCtrl'
	})
	.otherwise({
		redirectTo: '/home'
	});
})
.config(function($locationProvider) {
	$locationProvider.html5Mode(false);
}).config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;
}]);

