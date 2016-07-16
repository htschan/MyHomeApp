/*
 Installation of NPM packages:
 npm install ---save-dev yargs gulp-load-plugins del wiredep gulp-util

 Usage:
    gulp [prod-build|dev-build|...] [--verbose] [--web|--android|--ios|--wp8]
    gulp copyProdBuild [--verbose] [--web|--android|--ios|--wp8]
    gulp help

 */
var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config.js')();
var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

gulp.task('build', ['copyBowerComponentsToDevelopment','copyBowerCssComponentsToDevelopment','copyBowerFontComponentsToDevelopment'], function () {
    log('Copying Bower Components from repository to Development');
    return gulp;
});

gulp.task('copyBowerComponentsToDevelopment', [], function () {
    log('Copying Bower JavaScript from repository to Development');
    return gulp
        .src(config.bowerFiles)
        .pipe(gulp.dest(config.scriptsDest));
});

gulp.task('copyBowerCssComponentsToDevelopment', [], function () {
    log('Copying Bower CSS from repository to Development');
    return gulp
        .src(config.bowerCssFiles)
        .pipe(gulp.dest(config.cssDest));
});

gulp.task('copyBowerFontComponentsToDevelopment', [], function () {
    log('Copying Bower Fonts from repository to Development');
    return gulp
        .src(config.bowerFontFiles)
        .pipe(gulp.dest(config.fontsDest));
});

gulp.task('cleanScriptFolder', ['init'], function (done) {
    log('Clean the scripts folder');
    clean(config.scriptsDest + '/**/', done)
});

gulp.task('init', function () {
    log("Set config");
});

function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path, done);
}

function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log(util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}
