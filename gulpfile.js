/*
 * @Author: 焦江倩 
 * @Date: 2018-12-02 20:16:48 
 * @Last Modified by: 焦江倩
 * @Last Modified time: 2018-12-03 00:11:25
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

var list = require('./mock/data.json');
console.log(list);

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

                if (pathname === "/api/list") {
                    res.end(JSON.stringify({ code: 1, data: list }));
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    var data = fs.readFileSync(path.join(__dirname, 'src', pathname));
                    res.end(data);
                }


            }
        }))
})


// 线下环境
gulp.task('dev', gulp.series('scss', 'server', 'watch'));

gulp.task('bCss', function() {
    return gulp.src('./src/css/*.css')
        .pipe(minCss())
        .pipe(gulp.dest('./build/css'))
})

// gulp.task('bUglify', function() {
//     return gulp.src(['./src/js/**/*.js', './src/js/libs/*.js'])
//         .pipe(babel({
//             presets: ['@babel/env']
//         }))
//         .pipe(uglify())
//         .pipe(gulp.dest('./build/js'))
// })

gulp.task('copyLibs', function() {
    return gulp.src('./src/js/libs/*.js')
        .pipe(gulp.dest('./build/js/libs'))
})


// 线上环境
gulp.task('build', gulp.parallel('bCss', 'copyLibs'));