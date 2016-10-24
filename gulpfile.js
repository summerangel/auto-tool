/**
 * Created by summer on 16/10/21.
 */


//引入组件
var gulp = require('gulp');

//引入组件
var jshint = require('gulp-jshint'); //检查js
var sass = require('gulp-sass'); //编译sass
var concat = require('gulp-concat'); //合并
var uglify = require('gulp-uglify'); //uglify 组件（用于压缩js）
var rename = require('gulp-rename'); //重命名
var postcss = require('gulp-postcss');  //自动加前缀
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');

//检查js脚本的任务
gulp.task('lint',function(){
   gulp.src('src/js/*.js')   //可配置你需要检查脚本的具体名字
       .pipe(jshint())
       .pipe(jshint.reporter('default'));
});


//编译sass
gulp.task('sass',function(){
    gulp.src('src/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css')); //dest()写入文件
});

//自动加前缀
gulp.task('autoprefixer',function(){
    return gulp.src('.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer({ browser: ['last 2 versions'] }) ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dest'));
    console.log('autoprefixer task is done');
});

//合并，压缩Js文件
//找到js/目录下的所有js文件
gulp.task('scripts',function () {
    gulp.src('src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
    console.log('gulp task is done');
});


//定义默认任务，执行gulp会自动执行的任务
gulp.task('default',function(){
   gulp.run('lint','sass','scripts','autoprefixer');

    //监听js文件变化，当文件发生变化后会自动执行任务
    gulp.watch('src/js/*.js',function(){
       gulp.run('lint','scripts','autoprefixer');
    });

});