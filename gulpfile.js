const gulp = require('gulp');
const $ = require('gulp-load-plugins')({ camelize: true });
const browserSync = require('browser-sync').create();
const rollup = require('rollup-stream');
const source = require('vinyl-source-stream');

gulp.task('fonts', () => {
    gulp.src('src/fonts/*')
        .pipe(gulp.dest('dist/fonts'))
})

gulp.task('styles', () => {
    gulp.src('src/sass/*.scss')
        .pipe($.sass().on('error', $.sass.logError))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('rollup', function() {
  return rollup({
      entry: './src/js/boot.js'
    })
    .pipe(source('build.js'))
    .pipe(gulp.dest('./build/js'));
});

gulp.task("babel", ['rollup'], () => {

  return gulp.src("build/js/*.js")
    .pipe($.sourcemaps.init())
    .pipe($.babel({
        presets: ['es2015']
    }))
    .pipe($.sourcemaps.write("."))
    .pipe($.rename('app.build.js'))
    .pipe(gulp.dest("dist/js"));
});


gulp.task('pug', function buildHTML() {
  return gulp.src(['views/*.pug'])
  .pipe($.pug({
    pretty: true
  }))
  .pipe(gulp.dest("./"));
});

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// Watch Files For Changes
gulp.task('watch', () => {
  gulp.watch('views/*.pug', ['pug']);
  gulp.watch('src/js/**/*.js', ['babel']);
  gulp.watch('src/sass/*.scss', ['styles']);
  gulp.watch('src/fonts/*', ['fonts']);
});


// Default Task
gulp.task('default', ['styles', 'babel', 'fonts', 'pug', 'browser-sync', 'watch']);