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

// 将ES6规范的代码解析为ES5的代码 执行命令 gulp babel
gulp.task('babel', () =>
    gulp.src('./src/js/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(gulp.dest('./dist/js'))
    .pipe(connect.reload()) //开启自动刷新
);

// 将ES5的代码解析为浏览器识别的代码 执行命令gulp browserify
gulp.task('browserify', function () {
    // Single entry point to browserify
    return gulp.src('./dist/js/*.js')
        .pipe(browserify({
            insertGlobals: true
        }))
        .pipe(rename('build.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(connect.reload()) //开启自动刷新
});

// 将less转换成css
gulp.task('less', function () {
    return gulp.src('./src/less/*.less')
        .pipe(less())
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(connect.reload()) //开启自动刷新
});

//   将html转换
gulp.task("html", function () {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload()) //开启自动刷新
})

// 开启服务器
gulp.task('connect', function () {
    connect.server({
        port: 8848, //暴露端口号
        root: ['./dist'], //暴露目标
        livereload: true //是否开启自动刷新
    });
    // 自动打开浏览器
    exec('start http://127.0.0.1:8848');

    // 监视js html less文件的变化
    gulp.watch('./src/js/*.js', gulp.series(['js-dev']));
    gulp.watch('./src/less/*.less', gulp.series(['less']));
    gulp.watch('./src/index.html', gulp.series(['html']));
});

//   生产环境
// 压缩js
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
    return gulp.src('./dist/index.html')
      .pipe(htmlmin({ 
          collapseWhitespace: true,//清除所有空格
          removeComments:true//清除所有的注释
         }))
      .pipe(gulp.dest('./dist'));
  });

// 整合命令将js解析为浏览器识别的代码
gulp.task('js-dev', gulp.series(['babel', 'browserify']));

// 整合命令 gulp dev 可以直接生成所有开发文件 js css html
gulp.task('dev', gulp.parallel(['js-dev', 'less', 'html']));

// 整合命令 gulp watch 可以直接生成 所有开发文件 js css html并开启服务器打开浏览器
gulp.task('watch', gulp.series(['dev', 'connect']));

// 整合生产命令
gulp.task('js-prod',gulp.series(['js-dev','uglify']));
gulp.task('css-prod',gulp.series(['less','cssmin']));
gulp.task('build',gulp.parallel(['htmlmin','js-prod','css-prod']));