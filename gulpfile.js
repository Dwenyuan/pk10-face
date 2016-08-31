var gulp = require('gulp');
var exec = require('gulp-exec')
var ftp = require('gulp-ftp')
var gutil = require('gulp-util')
var run = require('gulp-run');

// use gulp-run to start a pipeline
gulp.task('default')
gulp.task('build', function (cb) {
    return run('npm run build').exec() // prints "Hello World\n".
        .pipe(gulp.dest('output')) // writes "Hello World\n" to output/echo.
});
gulp.task('upload', ['build'], function (cb) {
    return gulp.src(['build/*']).pipe(gulp.dest('/Users/liushao/Documents/workspace/PK10-server/src/main/webapp/build'))
});
var watcher = gulp.watch('src/**', ['upload'])
watcher.on('change', function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
})
