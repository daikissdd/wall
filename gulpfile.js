var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	minifyCss = require('gulp-minify-css'),
	imagemin = require('gulp-imagemin'),
	replace = require('gulp-replace'),
	minifyHTML = require('gulp-minify-html'),
	config = require('./gulpconfig.js');

var src = {img: 'assets/img', js: 'assets/js', css: 'assets/css', bower: 'assets/bower_components'},
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
		src.css + '/angular-busy/dist/angular-busy.min.css'
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

gulp.task('html', function () {
	var rejs = new RegExp('<script src="assets/bower_components/loadjs/load-min.js"></script><script src="gulpconfig.js"></script>');
	var recss = new RegExp('<link rel="stylesheet" href="assets/css/bootstrap.css" /><link rel="stylesheet" href="assets/bower_components/angular-busy/dist/angular-busy.min.css" /><link rel="stylesheet" href="assets/css/main.css" />');
	var env = new RegExp('%localhost%');
	gulp.src('./index.html')
	.pipe(replace(rejs, '<script async src="assets/js/all.js"></script>'))
	.pipe(replace(recss, '<link rel="stylesheet" href="assets/css/all.css" />'))
	.pipe(replace(env, 'production'))
	.pipe(gulp.dest('dist'));
});


gulp.task('copy', function() {
	gulp.src('assets/bower_components/angular-touch/angular-touch.min.js.map').pipe(gulp.dest(dist.js));
	gulp.src('assets/bower_components/loadjs/load-min.js').pipe(gulp.dest(dist.js));
	gulp.src('assets/fonts/*').pipe(gulp.dest('dist/assets/fonts'));
	gulp.src('assets/views/*').pipe(gulp.dest('dist/assets/views'));
	gulp.src('assets/html/*').pipe(gulp.dest('dist/assets/html'));
	gulp.src('gulpconfig.js').pipe(uglify()).pipe(gulp.dest('dist'));
});

gulp.task('default', function() {
	var white = '\u001b[37m', reset = '\u001b[0m', n = '\n';
	console.log(n + white + '*** Gulp task start. My script working in vietnam!! ***' + reset + n);
	gulp.run('js');
	gulp.run('css');
	gulp.run('copy');
	gulp.run('image');
	gulp.run('html');
});