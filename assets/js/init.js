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
		bower + 'sass-bootstrap/dist/js/bootstrap.min.js'
	).then(
		bower + 'angular-animate/angular-animate.min.js',
		bower + 'angular-route/angular-route.min.js',
		bower + 'angular-cookies/angular-cookies.min.js',
		bower + 'angular-touch/angular-touch.min.js',
		bower + 'angular-ui-bootstrap-bower/ui-bootstrap-tpls.min.js'
	).then(
		bower + 'angular-bootstrap-validation/dist/angular-bootstrap-validation.js',
		bower + 'angular-bootstrap-notifications/notifications.min.js'
	).then(
		js + 'app.js'
	).then(
		conf + 'app.js'
	).then(
		directive + 'app.js',
		service + 'app.js'
	).then(
		ctrl + 'app-ctrl.js'
	).thenRun(function () {
	   console.log('JS Loaded.');
	});

})();