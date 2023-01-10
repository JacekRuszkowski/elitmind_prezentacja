const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');
const kit = require('gulp-kit')
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

function sassCompiler(done) {
    src('./src/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write())
        .pipe(dest('./dist/css'));
    done()
}

function javaScript(done) {
    src('./src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write())
        .pipe(dest('./dist/js'));
    done()
}

function convertImages(done) {
    src('./src/img/*')
        .pipe(imagemin())
        .pipe(dest('./dist/img'));
    done()
}

function removeFiles(done) {
    src('./dist/img')
        .pipe(clean())
    done()
}

function handleKits(done) {
    src('./html/**/*.kit')
        .pipe(kit())
        .pipe(dest('./'))
    done()
}

function startBrowserSync(done) {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    done()
}

function watchForChanges(done) {
    watch('./index.html').on('change', reload)
    watch(['./src/sass/*.scss', './src/js/*.js', './html/**/*.kit'], parallel(handleKits, sassCompiler, javaScript)).on('change', reload)
    watch('./src/img/*', convertImages).on('change', reload)
    done()
}

const mainFunctions = parallel(handleKits, sassCompiler, javaScript, convertImages)
exports.default = series(mainFunctions, startBrowserSync, watchForChanges)

exports.removeFiles = removeFiles

