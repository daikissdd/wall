(function() {

	var bowerPath = 'assets/bower_components/';
	var jsPath = 'assets/js/';

	load(
	    bowerPath + 'lodash/dist/lodash.min.js',
	    bowerPath + 'jquery/dist/jquery.min.js'
	).then(
		bowerPath + 'angular/angular.min.js'
	).then(
		bowerPath + 'angular-animate/angular-animate.min.js',
		bowerPath + 'angular-touch/angular-touch.min.js',
		bowerPath + 'angular-ui-bootstrap-bower/ui-bootstrap-tpls.min.js'
	).then(
		jsPath + 'app1.js',
		jsPath + 'app2.js',
		jsPath + 'app3.js'
	).thenRun(function () {
	   console.log('Loaded.');
	});

})();