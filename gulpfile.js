var gulp = require('gulp'),
        sass = require('gulp-sass'),
        autoprefixer = require('gulp-autoprefixer'),
        minifycss = require('gulp-minify-css'),
        nodemon = require("gulp-nodemon"),
        rename = require('gulp-rename');

gulp.task('express', function() {
  var express = require('express');
  var app = express();
  //app.use(require('connect-livereload')({port: 4002}));
  //app.use(express.static(__dirname));
  app.listen(4000);
});

var tinylr;
gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
  tinylr.listen(4002);
});

function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname, event.path);

  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

gulp.task('styles', function() {
      return gulp.src('public/**/*.scss')
        .pipe(sass({ style: 'expanded' }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(gulp.dest('public/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('public/'));
});

gulp.task('watch', function() {
  gulp.watch('public/**/*.scss', ['styles']);
  //gulp.watch('views/**/*.tpl', notifyLiveReload);
  //gulp.watch('public/**/*.css', notifyLiveReload);
    nodemon({
        script: 'index.js',
        ext: 'js html',
        watch: [
            'index.js',
            'app.js',
            'public/',
            'routes/',
            'views/'
        ]
    });
});

gulp.task('default', ['styles', 'express', 'watch'], function() {

});
//gulp.task('default', ['styles', 'express', 'livereload', 'watch'], function() {

//});


