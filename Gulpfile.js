var gulp    = require('gulp');
var babel   = require('gulp-babel');
var mocha   = require('gulp-mocha');
var del     = require('del');

gulp.task('clean', function (cb) {
    del('lib', cb);
});

gulp.task('build', ['clean'], function () {
    return gulp
        .src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('lib'));
});

gulp.task('watch', ['build'], function () {
    gulp.watch('src/*.js', ['build']);
});

gulp.task('test', ['build'], function () {
    return gulp
        .src('test/**.js')
        .pipe(mocha({
            ui:       'bdd',
            reporter: 'spec',
            timeout:  typeof v8debug === 'undefined' ? 2000 : Infinity // NOTE: disable timeouts in debug
        }));
});

gulp.task('preview', ['build'], function () {
    var buildReporterPlugin = require('testcafe').embeddingUtils.buildReporterPlugin;
    var pluginFactory       = require('./lib');
    var reporterTestCalls   = require('./test/utils/reporter-test-calls');
    var plugin              = buildReporterPlugin(pluginFactory);

    reporterTestCalls.forEach(function (call) {
        plugin[call.method].apply(plugin, call.args);
    });

    process.exit(0);
});
