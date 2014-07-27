var App = angular.module('wall', ['ngRoute', 'ngAnimate', 'ngCookies'])
.config(function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/home', {
		templateUrl: 'assets/views/home.html',
		controller: 'appCtrl'
	})
	.when('/app/:code', {
		templateUrl: 'assets/views/app.html',
		controller: 'wallCtrl'
	})
	.otherwise({
		redirectTo: '/home'
	});
})
.config(function($locationProvider) {
	$locationProvider.html5Mode(false);
});

App.define = (function(define) {
	return {
		set: function(name, value) { return define[name] = value; },
		get: function(name) { return define[name]; }
	};
})({});

