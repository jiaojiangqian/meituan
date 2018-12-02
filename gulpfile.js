/*
 * @Author: 焦江倩 
 * @Date: 2018-12-02 20:16:48 
 * @Last Modified by: 焦江倩
 * @Last Modified time: 2018-12-02 20:47:22
 */

var gulp = require('gulp');

var sass = require('gulp-sass');

var autoprefixer = require('gulp-autoprefixer');

var minCss = require('gulp-clean-css');

var uglify = require('gulp-uglify');

var server = require('gulp-webserver');

// var babel = require('gulp-babel');

var url = require('url');

var path = require('path');

var fs = require('fs');

gulp.task('scss', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
})

gulp.task('watch', function() {
    return gulp.watch('./src/scss/*scss', gulp.series('scss'))
});

gulp.task('server', function() {
    return gulp.src('./src')
        .pipe(server({
            port: 9999,
            livereload: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                console.log(pathname);

                if (pathname === '/favicon.ico') {
                    res.end('');
                    return;
                }

                pathname = pathname === '/' ? 'index.html' : pathname;
                var data = fs.readFileSync(path.join(__dirname, 'src', pathname));
                res.end(data);
            }
        }))
})

gulp.task('dev', gulp.series('scss', 'server', 'watch'));