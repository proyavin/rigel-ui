const package = require('./package.json');
const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cleancss = require('gulp-clean-css');
const rename = require('gulp-rename');
const header = require('gulp-header');

const banner = `/*! ${package.name} ${package.version} | ${package.homepage} | (c) 2020 ${package.author} | ${package.license} License */\n`

const paths = {
    scss_source: './src/scss/**/*.scss'
}

function build() {
    return gulp.src(paths.scss_source)
            .pipe(sass({
                includePaths: ['node_modules']
            }).on('error', sass.logError))
            .pipe(postcss())
            .pipe(header(banner))
            .pipe(gulp.dest('./dist'))
            .pipe(cleancss())
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest('./dist'))
}

gulp.task('watch', function() {
    gulp.watch(paths.scss_source, gulp.series('build'));
})

gulp.task('build', build)

gulp.task('default', gulp.series(
    gulp.parallel('build')
))
