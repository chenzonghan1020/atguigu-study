const gulp = require('gulp');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const rename = require('gulp-rename');
const less = require('gulp-less');
const concat = require('gulp-concat');
connect = require('gulp-connect');
const uglify = require('gulp-uglify');
const cssmin = require('gulp-cssmin');
const htmlmin = require('gulp-htmlmin');
const {
  exec
} = require("child_process");

gulp.task('babel', () =>
  gulp.src('./src/js/*.js') // 将 src/js 所有JS文件导入到gulp的流中
  .pipe(babel({
    // 使用babel对流中的文件进行编译
    // 将ES6语法编译成ES5以下语法
    // 将ES6模块化编译成commonjs
    presets: ['@babel/env']
  }))
  .pipe(gulp.dest('dist/js')) // 输出到dist目录下
  .pipe(connect.reload())
);
//使用gulp babel 命令启动

// browserify
gulp.task('browserify', function () {
  // Single entry point to browserify
  return gulp.src('./dist/js/index.js')
    .pipe(browserify({
      insertGlobals: true
    }))
    .pipe(rename('build.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(connect.reload());
});
// 自动生成css
gulp.task('less', function () {
  return gulp.src('./src/less/*.less')
    .pipe(less())
    .pipe(concat('all.css'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(connect.reload());
});

// html
gulp.task('html', function () {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
})

// 配置服务器
gulp.task('connect', function () {
  connect.server({
    port:8848,//暴露端口号
    root:['./dist'],//暴露目标
    livereload:true,//自动刷新浏览器
  });
  // 自动打开浏览器
  exec("start http://127.0.0.1:8848")
  // 监听js、html、less文件的变化
  gulp.watch('./src/js/*.js',gulp.series(['js-dev']));
  gulp.watch('./src/less/*.less',gulp.series(['less']));
  gulp.watch('./src/index.html',gulp.series(['html']));
});

// 压缩js
gulp.task('uglify',function(){
  return gulp.src('./dist/js/build.js')
  .pipe(uglify())
  .pipe(rename('build.min.js'))
  .pipe(gulp.dest('./dist/js'))
});
// 压缩css
gulp.task('cssmin', function () {
 return gulp.src('./dist/css/*.css')
      .pipe(cssmin())
      .pipe(rename('all.min.css'))
      .pipe(gulp.dest('./dist/css'));
});
// html压缩
gulp.task('htmlmin', () => {
  return gulp.src('./src/index.html')
    .pipe(htmlmin({ 
      collapseWhitespace: true,//去除空格
      removeComments: true, // 去除注释
     }))
    .pipe(gulp.dest('./dist'));
});


// 整合js命令 将js从ES6规范转换成浏览器识别的代码
// gulp.task("js-dev",series(['babel','browserify']))
gulp.task("js-dev", gulp.series(["babel", "browserify"]));

// 无序整合mingl
gulp.task('dev', gulp.parallel(['js-dev', 'html', 'less']))

// 整合开发环境命令
gulp.task("watch",gulp.series(["dev","connect"]))

// 整合生产环境命令
gulp.task('js-prod',gulp.series(['js-dev','uglify']));
gulp.task('css-prod',gulp.series(['less','cssmin']));
gulp.task('build',gulp.parallel(['htmlmin','js-prod','css-prod']));

