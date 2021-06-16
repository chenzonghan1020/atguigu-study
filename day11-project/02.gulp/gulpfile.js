const gulp = require('gulp');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const rename = require('gulp-rename');
const less = require('gulp-less');
const concat = require('gulp-concat');
const connect = require('gulp-connect');
const uglify = require('gulp-uglify');
const cssmin = require('gulp-cssmin');
const htmlmin = require('gulp-htmlmin');
const {
    exec
} = require('child_process');

// 将ES6规范转为ES5
gulp.task('babel', () =>
    gulp.src('./src/js/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(gulp.dest('./dist/js'))
    .pipe(connect.reload()) //自动刷新
);

gulp.task('browserify', function () {
    // Single entry point to browserify
    return gulp.src('./dist/js/index.js')
        .pipe(browserify({
            insertGlobals: true
        }))
        .pipe(rename('build.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(connect.reload()) //自动刷新
});

// less 转换成css
gulp.task('less', function () {
    return gulp.src('./src/less/*.less')
        .pipe(less())
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(connect.reload()) //自动刷新
});

//转换成html
gulp.task("html", function () {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload()); //自动刷新
})

// 开启服务器
gulp.task('connect', function () {
    connect.server({
        port: 8848, //暴露端口号
        root: ['./dist'], //暴露目标
        livereload: true //是否开启制动自动刷新
    });
    exec("start http://127.0.0.1:8848")
    // 监听js html less 文件的改变
    gulp.watch('./src/js/*.js', gulp.series(['js-dev']));
    gulp.watch('./src/less/*.less', gulp.series(['less']));
    gulp.watch('./src/index.html', gulp.series(['html']));
});

//   生产依赖环境
// 压缩js
gulp.task('uglify', function () {
    return gulp.src('./dist/js/build.js')
        .pipe(uglify())
        .pipe(rename('build.min.js'))
        .pipe(gulp.dest('./dist/js'))
})
// 压缩css
gulp.task('cssmin', function () {
    return gulp.src('./dist/css/*.css')
        .pipe(cssmin())
        .pipe(rename('all.min.css'))
        .pipe(gulp.dest('./dist/css'));
});
// 压缩html
gulp.task('htmlmin', function (){
    return gulp.src('./src/index.html')
        .pipe(htmlmin({
            collapseWhitespace: true, //去除空格
            removeComments:true//去除注释
        }))
        .pipe(gulp.dest('./dist'));
});

// 顺序整合 将ES6标准的js文件转换成浏览器识别的文件
gulp.task("js-dev", gulp.series(['babel', 'browserify']))
// 整合
gulp.task("dev", gulp.parallel(['js-dev', 'less', 'html']))

// 整合开发环境的命令
gulp.task('watch', gulp.series(['dev', 'connect']))

// 整合生产环境
gulp.task('js-prod',gulp.series(['js-dev','uglify']))
gulp.task('css-prod',gulp.series(['less','cssmin']))
gulp.task('build',gulp.parallel(['htmlmin','js-prod','css-prod']))