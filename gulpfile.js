 var gulp = require('gulp'),
 	browserify = require('browserify'), // Transpile ES6 to browser-friendly ES5
 	reactify = require('reactify'), // Converts jsx to js
 	source = require('vinyl-source-stream'), // Converts string to stream for Browserify
 	browserSync = require('browser-sync').create(),
 	runSequence = require('run-sequence'), // Run a series of dependent gulp tasks in order
 	autoPrefixer = require('gulp-autoprefixer'), // Prefix CSS with Autoprefixer
 	del = require('del'), // Delete files and folders
 	sass = require('gulp-sass'), // Gulp plugin for compiling sass
 	config = {
 	  paths: {
 	  	dist: './dist',
 	  	entryFile: './src/js/main.js',
 	  	js: './src/js',
 	    src: './src',
 	    sass: './src/styles/**/*.{sass,scss}',
 	    tmp: './tmp'
 	  }
 	};

 gulp.task('default', function() {
 	return runSequence(
 		'clean:tmp',
 		'compile:sass',
 		'browserify',
 		'serve'
 	);
 });

 /**
  * Delete all temporary files located in .tmp/
  */
 gulp.task('clean:tmp', function () {
   return del.sync(config.paths.tmp);
 });

 /**
  * Compile Sass to CSS, autoprefix, move to the tmp folder
  */
 gulp.task('compile:sass', function () {
   return gulp.src([config.paths.sass, '!./src/styles/vendor/**'])
     // .pipe(plugins.sourcemaps.init())
     .pipe(sass({
       indentedSyntax: true
     }))
     .pipe(autoPrefixer())
     // .pipe(plugins.sourcemaps.write('maps'))
     .pipe(gulp.dest(config.paths.tmp + '/styles'));
 });

/**
 * Transpile ES6 to ES5, convert jsx to js, bundle, rename, move
 */
 gulp.task('browserify', function() {
 	return browserify(config.paths.entryFile, {debug: true})
 		.transform('reactify')
 		.bundle()
 		.pipe(source('application.js'))
 		.pipe(gulp.dest(config.paths.tmp + '/js'));
 });

 /**
  * Start a local server serving files from .tmp/ and src/
  */
 gulp.task('serve', function () {
   browserSync.init({
     server: {
       baseDir: [
         config.paths.tmp,
         config.paths.src
       ],
       routes: {
         // '/bower_components': './bower_components'
       }
     },
     ghostMode: {
       clicks: true,
       forms: true,
       scroll: false
     },
     open: false,
     notify: false
   });

   gulp.watch(config.paths.sass, function () {
     return runSequence('compile:sass', 'reload');
   });

   gulp.watch(config.paths.html, function () {
     return runSequence('reload');
   });

   gulp.watch([config.paths.js], function () {
     return runSequence('browserify', 'reload');
   });

 });

 /**
  * Reload the page with BrowserSync
  */
 gulp.task('reload', function () {
   browserSync.reload();
 });

