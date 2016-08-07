var gulp = require('gulp');
var tsc = require('gulp-typescript');
var tslint = require('gulp-tslint');
var gulp_jspm = require('gulp-jspm');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('watch', function() {
    gulp.watch('app/*.*', ['bundle']);
});

gulp.task('default', ['bundle', 'polyfill']);

gulp.task('tsc', function() {
	return gulp.src([
			'typings/index.d.ts',
			'app/*.ts'])
				.pipe(tsc({
					outDir: "dist/app",
					target: "es5",
					module: "commonjs",
					moduleResolution: "node",
					emitDecoratorMetadata: true,
					experimentalDecorators: true,
					removeComments: false,
					noImplicitAny: false
				}))
				.pipe(gulp.dest('dist/app'));
});

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

gulp.task("bundle", ['tsc'], function() {
    gulp.src("dist/app/main.js")
        .pipe(gulp_jspm({inject: true, minify: true, mangle: true}))
        .pipe(gulp.dest('dist/'))
});

gulp.task("polyfill", function() {
    gulp.src([
        'node_modules/core-js/client/shim.min.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/systemjs/dist/system.src.js'
    ])
        .pipe(concat('polyfill.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'))
});
