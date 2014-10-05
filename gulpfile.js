var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	minifyCss = require('gulp-minify-css'),
	imagemin = require('gulp-imagemin');

var src = {img: 'assets/img', js: 'assets/js', css: 'assets/css'};
var dist = {img: 'assets/dist/img', js: 'assets/dist/js', css: 'assets/dist/css'};

gulp.task('concat', function() {
	gulp.src([
		src.js + '/init.js',
		src.js + '/app.js',
	])
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