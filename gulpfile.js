var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	minifyCss = require('gulp-minify-css'),
	imagemin = require('gulp-imagemin');
	config = require('./gulpconfig.js');

var src = {img: 'assets/img', js: 'assets/js', css: 'assets/css'},
	dist = {img: 'dist/assets/img', js: 'dist/assets/js', css: 'dist/assets/css'},
	jsfiles = config.get();

gulp.task('js', function() {
	gulp.src(jsfiles)
	.pipe(concat('all.js'))
	.pipe(gulp.dest(dist.js));
});

gulp.task('css', function() {
	gulp.src([
		src.css + '/bootstrap.css',
		src.css + '/main.css',
	])
	.pipe(concat('all.css'))
	.pipe(minifyCss())
	.pipe(gulp.dest(dist.css));
});

gulp.task('image', function () {
  return gulp.src(src.img + '/**/*.{png,jpg,gif,ico}')
    .pipe(imagemin({
		progressive: true,
		interlaced: true
    }))
    .pipe(gulp.dest(dist.img));
});

gulp.task('copy', function() {
	gulp.src('assets/bower_components/angular-touch/angular-touch.min.js.map').pipe(gulp.dest(dist.js));
	gulp.src('./index.html').pipe(gulp.dest('dist'));
});

gulp.task('default', function() {
	var white = '\u001b[37m', reset = '\u001b[0m', n = '\n';
	console.log(n + white + '*** Gulp task start. My script working in vietnam!! ***' + reset + n);
	gulp.run('js');
	gulp.run('css');
	gulp.run('copy');
	gulp.run('image');
});