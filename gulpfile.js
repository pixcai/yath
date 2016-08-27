var gulp = require('gulp');
var del = require('del');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var webpack = require('webpack-stream');

gulp.task('build', function() {
  gulp.src('./lib/browser_yath.js')
    .pipe(webpack({
      output: {
        filename: 'yath.js'
      }
    }))
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['build'], function() {
  gulp.src('./lib/nodejs_yath.js')
    .pipe(webpack({
      output: {
        filename: 'yath.js',
        libraryTarget: 'commonjs2'
      },
      target: 'node'
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('clean', function() {
  del('./dist');
});
