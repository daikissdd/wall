var gulp = require('gulp');
var ngmin = require('gulp-ngmin');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');

/**
* This object contains all of the file dependencies for the gulp
*/
var paths = {
 scripts: [
   './notifications.js'
 ]
};

gulp.task('lint', function(){
 var options = {
   camelcase: true,
   curly: true,
   expr: true,
   eqeqeq: true,
   funcscope: true,
   immed: true,
   indent: 2,
   maxcomplexity: 10,
   maxlen: 120,
   noarg: true,
   noempty: true,
   trailing: true,
   strict: true,
   quotmark: 'single'
 };

 return gulp.src(paths.scripts)
   .pipe(jshint(options))
   .pipe(jshint.reporter('jshint-stylish'))
   .pipe(jshint.reporter('fail'));
});

/**
* This method takes all .js files and concatenates/minifies them
*/
gulp.task('default', ['lint'], function(){
 return gulp.src(paths.scripts)
   .pipe(concat('notifications.min.js'))
   .pipe(ngmin())
   .pipe(uglify())
   .pipe(gulp.dest('./'));
});
