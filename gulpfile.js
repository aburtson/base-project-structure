'use strict';

const gulp         = require('gulp');              // gulp!
const concat       = require('gulp-concat');       // concatenates js
const uglify 	     = require('gulp-uglify');       // minifies js
const rename 	     = require('gulp-rename');       // renames files
const sass         = require('gulp-sass');	       // compiles sass
const maps 		     = require('gulp-sourcemaps');   // makes sourcemaps for js, css, scss, less
const cssnano      = require('gulp-cssnano');      // minifies css
const del 		   	 = require('del');               // deletes files for clean up
const autoprefixer = require('gulp-autoprefixer'); // auto-adds vendor prefixes to css
const browserSync  = require('browser-sync');      // reloads browser after changing a file
const twig         = require('gulp-twig');         // templates html
const prettify     = require('gulp-prettify');     // indents html files properly
const plumber  	   = require('gulp-plumber');      // handles gulp errors

// scripts from vendors
var vendorScripts = [
	'node_modules/jquery/dist/jquery.min.js',
	'node_modules/slick-carousel/slick/slick.js',
	'./src/assets/js/vendors/bootstrap.js',
	'./src/assets/js/vendors/img-load.js',
	'./src/assets/js/vendors/bootstrap-datepicker.js'
];

// custom project scripts
var mainScripts = [
	'./src/assets/js/main/header.js',
	// './src/assets/js/main/promo.js',
	'./src/assets/js/main/footer.js',
	'./src/assets/js/main/vertical-center.js',
	'./src/assets/js/main/date-picker.js',
	'./src/assets/js/main/read-more.js',
	'./src/assets/js/main/accordion.js',
	'./src/assets/js/main/modal-slider.js',
	'./src/assets/js/main/steps.js',
	'./src/assets/js/main/slide-selector.js',
	'./src/assets/js/main/video-modal.js',
];

// all scripts concatenated
var allScripts = vendorScripts.concat(mainScripts);

// compile twig templates to html
gulp.task('template', function() {
	return gulp.src('src/templates/*.html') // run twig template parser on all html in /src
	.pipe(plumber())
	.pipe(twig())
	.pipe(prettify())
	.pipe(gulp.dest('./dist')) // output rendered html into /dist
	.pipe(browserSync.stream());
});

// concatenate js into dist/assets/js/app.js
gulp.task('concatScripts', function() {
	return gulp.src(allScripts)
	.pipe(maps.init())
	.pipe(concat('app.js'))
	.pipe(maps.write('./'))
	.pipe(gulp.dest('./dist/assets/js'));
});

// concatenate and minify js into dist/assets/js/app.min.js
gulp.task('minifyScripts', function() {
	return gulp.src(allScripts)
	.pipe(plumber())
	.pipe(maps.init())
	.pipe(concat('app.js'))                 // concatenate js into app.js
	.pipe(uglify())                         // minify app.js
	.pipe(rename("app.min.js"))             // rename to app.min.js
	.pipe(maps.write('./'))                 // create source maps
	.pipe(gulp.dest('./dist/assets/js'))    // place files in /dist/assets/js
	.pipe(browserSync.stream());            // reload the browser
});

// include types of vendor prefixes
var supported = [
	'last 5 versions',
	'safari >= 8',
	'ie >= 9',
	'ff >= 20',
	'ios 6',
	'android 4'
];

// compile sass into dist/assets/css/main.min.css
gulp.task('compileSass', function() {
	return gulp.src('src/assets/scss/main.scss')
	.pipe(maps.init())
	.pipe(sass())  											// compile sass from scss/main.scss to main.css
	.pipe(autoprefixer({browsers: supported, add: true}))   // add css prefixes
	.pipe(maps.write('./'))									// write source maps
	.pipe(gulp.dest('dist/assets/css'));					// place maps and css in /dist/assets/css
});

// compile and minify sass into dist/assets/css/main.min.css
gulp.task('minifyCss', function() {
	return gulp.src('src/assets/scss/main.scss')
	.pipe(plumber())
	.pipe(maps.init())
	.pipe(sass())										  // compile sass from scss/main.scss to main.css
	.pipe(cssnano({										  // add css prefixes and minify css
		autoprefixer: {browsers: supported, add: true}
	}))
	.pipe(rename("main.min.css"))						  // rename to main.min.css
	.pipe(maps.write('./'))								  // write source maps
	.pipe(gulp.dest('./dist/assets/css'))				  // place maps and min.css in /dist/assets/css
	.pipe(browserSync.stream());						  // reload the browser
});

// get extra css files from assets/css and place them in dist/assets/css
gulp.task('getCss', function () {
	return gulp.src('./src/assets/css/**')
	.pipe(gulp.dest('./dist/assets/css'));
});

// get font files from assets/fonts and place them in dist/assets/fonts
gulp.task('getFonts', function () {
	return gulp.src('./src/assets/fonts/**')
	.pipe(gulp.dest('./dist/assets/fonts'));
});

// start dev server and watch files
gulp.task('watchFiles',['build'], function() {
	browserSync.init({											// start dev server at localhost
        server: "./dist"
    });
	gulp.watch('./src/assets/scss/**/*.scss', ['minifyCss']);	// watch and update css
	gulp.watch('./src/assets/js/**/*.js', ['minifyScripts']);	// watch and update js
	gulp.watch('./src/templates/**/*.html', ['template']);		// watch and update templates
});

// build dist directory and add all files for production
gulp.task('build', ['template', 'getFonts', 'getCss', 'minifyScripts', 'minifyCss', 'compileSass', 'concatScripts'], function() {
	return gulp.src(["src/assets/img/**"], { base: './src'})
	.pipe(gulp.dest('dist'));
});

// delete all folders created by gulp tasks
gulp.task('clean', function(){
	del(['dist']);
});

// default task: run watch listeners
gulp.task('default', [], function() {
	gulp.start(['watchFiles']);
});

