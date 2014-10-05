var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	minifyCss = require('gulp-minify-css'),
	imagemin = require('gulp-imagemin');

var src = {img: 'assets/img', js: 'assets/js', css: 'assets/css'},
	dist = {img: 'assets/dist/img', js: 'assets/dist/js', css: 'assets/dist/css'},
	bower = 'assets/bower_components/',
	js = 'assets/js/',
	ctrl = js + 'controllers/',
	conf = js + 'config/',
	service = js + 'services/',
	directive = js + 'directives/',
	distjs = 'assets/dist/js/all.js';

var jsfiles = [
    bower + 'lodash/dist/lodash.min.js',
    bower + 'jquery/dist/jquery.min.js',
    bower + 'aws-sdk-js/dist/aws-sdk.min.js',
	bower + 'angular/angular.min.js',
	bower + 'sass-bootstrap/dist/js/bootstrap.min.js',
	bower + 'jquery.transit/jquery.transit.js',
	bower + 'angular-animate/angular-animate.min.js',
	bower + 'angular-route/angular-route.min.js',
	bower + 'angular-cookies/angular-cookies.min.js',
	bower + 'angular-touch/angular-touch.min.js',
	bower + 'angular-ui-bootstrap-bower/ui-bootstrap-tpls.min.js',
	bower + 'angular-bootstrap-validation/dist/angular-bootstrap-validation.js',
	bower + 'angular-bootstrap-notifications/notifications.min.js',
	bower + 'angular-busy/dist/angular-busy.min.js',
	bower + 'angularLocalStorage/src/angularLocalStorage.js',
	js + 'app.js',
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
	service + 'latest.js',
	ctrl + 'app-ctrl.js',
	ctrl + 'password-ctrl.js',
	ctrl + 'modal-ctrl.js',
	ctrl + 'home-ctrl.js',
	ctrl + 'wall-ctrl.js',
	ctrl + 'admin-ctrl.js',
	ctrl + 'card-ctrl.js'
];

gulp.task('concat', function() {
	gulp.src(jsfiles)
	.pipe(concat('all.js'))
	.pipe(gulp.dest(dist.js));
});

gulp.task('copy', function() {
	gulp.src(src.img + '/**').pipe(gulp.dest(dist.img));
	gulp.src(src.css + '/**').pipe(gulp.dest(dist.css));
});

gulp.task('default', function() {
	console.log('-- daikissdd -- gulp start!!');
	gulp.run('concat');
});