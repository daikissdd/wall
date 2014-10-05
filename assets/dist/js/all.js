(function() {

	var bower = 'assets/bower_components/';
	var js = 'assets/js/';
	var ctrl = js + 'controllers/';
	var conf = js + 'config/';
	var service = js + 'services/';
	var directive = js + 'directives/';

	load(
	    bower + 'lodash/dist/lodash.min.js',
	    bower + 'jquery/dist/jquery.min.js',
	    bower + 'aws-sdk-js/dist/aws-sdk.min.js'
	).then(
		bower + 'angular/angular.min.js',
		bower + 'sass-bootstrap/dist/js/bootstrap.min.js',
		bower + 'jquery.transit/jquery.transit.js'
	).then(
		bower + 'angular-animate/angular-animate.min.js',
		bower + 'angular-route/angular-route.min.js',
		bower + 'angular-cookies/angular-cookies.min.js',
		bower + 'angular-touch/angular-touch.min.js',
		bower + 'angular-ui-bootstrap-bower/ui-bootstrap-tpls.min.js'
	).then(
		bower + 'angular-bootstrap-validation/dist/angular-bootstrap-validation.js',
		bower + 'angular-bootstrap-notifications/notifications.min.js',
		bower + 'angular-busy/dist/angular-busy.min.js',
		bower + 'angularLocalStorage/src/angularLocalStorage.js'
	).then(
		js + 'app.js'
	).then(
		conf + 'app.js'
	).then(
		directive + 'copyright.js',
		directive + 'modalside.js',
		service + 'url.js',
		service + 'geturl.js',
		service + 'product.js',
		service + 'wall.js',
		service + 'card.js',
		service + 'mail.js',
		service + 'modal.js',
		service + 'switcher.js',
		service + 'latest.js'
	).then(
		ctrl + 'app-ctrl.js',
		ctrl + 'password-ctrl.js',
		ctrl + 'modal-ctrl.js',
		ctrl + 'home-ctrl.js',
		ctrl + 'wall-ctrl.js',
		ctrl + 'admin-ctrl.js',
		ctrl + 'card-ctrl.js'
	).thenRun(function () {
	   console.log('JS Loaded.');
	});

})();
var App = angular.module('wall', [
	'ngRoute',
	'ngAnimate',
	'ngCookies',
	'angularLocalStorage',
	'cgBusy',
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
	.when('/admin/', {
		templateUrl: 'assets/views/admin.html',
		controller: 'adminCtrl'
	})
	.otherwise({
		redirectTo: '/home'
	});
})
.config(function($locationProvider) {
	$locationProvider.html5Mode(false);
})
.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;
}])
.value('cgBusyDefaults',{
    message:'Now Loading...',
    backdrop: true,
    delay: 300,
    minDuration: 700
});

