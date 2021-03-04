const {
    src,
    dest,
    watch,
    series
} = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
const browsersync = require('browser-sync').create();


function browsersyncServe(cb) {
    browsersync.init({
        server: {
            baseDir: './'
        }
    });
    cb();
}

// Sass Task
function scssTask() {
    return src('./sass/**/*.+(scss|sass)')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(rename({
            prefix: "",
            basename: "styles",
            suffix: ".min"
        }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(sourcemaps.write())
        .pipe(dest('./css'));
}

function browsersyncReload(cb) {
    browsersync.reload();
    cb();
}

function watchTask() {
    watch('./*.html', browsersyncReload);
    watch(['./sass/**/*.+(scss|sass)'], series(scssTask, browsersyncReload));
}

// Default Gulp Task
exports.default = series(
    scssTask,
    browsersyncServe,
    watchTask
);