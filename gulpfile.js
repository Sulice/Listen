var gulp = require('gulp');
var tslint = require('gulp-tslint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task("tslint", function() {
	gulp.src('app/*.ts')
		.pipe(tslint({
		}))
		.pipe(tslint.report({
			reportLimit: 2,
			emitError: false,
			summarizeFailureOutput: true
		}))
});

gulp.task("polyfill", function() {
    gulp.src([
        'node_modules/core-js/client/shim.min.js',
        'node_modules/zone.js/dist/zone.js',
    ])
        .pipe(concat('polyfill.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'))
});
