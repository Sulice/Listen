var gulp = require('gulp');
var tsc = require('gulp-typescript');

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
