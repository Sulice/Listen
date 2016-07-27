var gulp = require('gulp');
var tsc = require('gulp-typescript');
var tslint = require('gulp-tslint');

gulp.task('default', function() {
	console.log('plop');
});

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
				.pipe(gulp.dest('dist'));
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
