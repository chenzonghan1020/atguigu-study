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
} = require("child_process");

// 将ES6规范转换为ES5规范
gulp.task('babel', () =>
    gulp.src('./src/js/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(gulp.dest('./dist/js'))
    .pipe(connect.reload())//自动刷新
);
// 将ES5转换成浏览器认识的代码
gulp.task('browserify', function () {
    // Single entry point to browserify
    return gulp.src('./dist/js/*.js')
        .pipe(browserify({
            insertGlobals: true
        }))
        .pipe(rename('build.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(connect.reload())//自动刷新
});
// 将less转换为css
gulp.task('less', function () {
    return gulp.src('./src/less/*.less')
        .pipe(less())
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(connect.reload())//自动刷新
});

//   转换html
gulp.task("html", function () {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload())//自动刷新
})

// 启动服务器
gulp.task('connect', function() {
    connect.server({
       port:8848, //暴露端口
       root:['./dist'],//暴露目标
       livereload:true//是否自动刷新
    });
    exec("start http://127.0.0.1:8848")//自动打开浏览器
    // 监听js html less 文件是否发生变化
    gulp.watch('./src/js/*.js',gulp.series(['js-dev']));
    gulp.watch('./src/less/*.less',gulp.series(['less']));
    gulp.watch('./src/index.html',gulp.series(['html']));
  });

//   生产环境
// js压缩
gulp.task('uglify', function () {
    return gulp.src('./dist/js/build.js')
    .pipe(uglify())
    .pipe(rename('build.min.js'))
    .pipe(gulp.dest('./dist/js'))
  });

//   压缩css
gulp.task('cssmin', function () {
    return gulp.src('./dist/css/all.css')
        .pipe(cssmin())
        .pipe(rename('all.min.css'))
        .pipe(gulp.dest('./dist/css'));
});
// 压缩html
gulp.task('htmlmin', () => {
    return gulp.src('./src/index.html')
      .pipe(htmlmin({
           collapseWhitespace: true,//去除空格
           removeComments:true//去除注释
         }))
      .pipe(gulp.dest('./dist'));
  });

// 整合代码将ES6规范转换成浏览器认识的代码
gulp.task("js-dev", gulp.series(['babel', 'browserify']));
// 整合代码
gulp.task('dev',gulp.parallel(['js-dev','less','html']))
// 整合开发环境代码
gulp.task('watch',gulp.series(['dev','connect']));

// 整合生产开发环境
gulp.task('js-prod',gulp.series(['js-dev','uglify']));
gulp.task('css-prod',gulp.series(['less','cssmin']));
gulp.task('build',gulp.parallel(['html','js-prod','css-prod']));