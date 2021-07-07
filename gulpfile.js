const gulp = require("gulp");
// 压缩 css 函数工具
const cssmin = require("gulp-cssmin");
// 压缩 html 函数工具
const htmlmin = require("gulp-htmlmin");
// 压缩 js 函数工具
const uglify = require("gulp-uglify");
// 压缩图片函数工具
const imagemin = require("gulp-imagemin");
// 清除css
const cleanCSS = require("gulp-clean-css");

const less = require("gulp-less");

const LessAutoprefix = require("less-plugin-autoprefix");
const autoprefix = new LessAutoprefix({ browsers: ["last 2 versions"] });
const clearDist = require("gulp-clean");

const path = require("path");
const rename = require("gulp-rename");
const server = require("gulp-webserver");

const fileinclude = require("gulp-file-include");

// 转化less 添加前缀并压缩
const cssHandler = function () {
  return gulp
    .src("./src/pages/**/*.less")
    .pipe(
      less({
        paths: [path.join(__dirname, "less", "includes")],
        plugins: [autoprefix],
      })
    )
    .pipe(cleanCSS())
    .pipe(cssmin()) // css 代码压缩
    .pipe(rename({ extname: ".min.css" }))
    .pipe(gulp.dest("./dist/pages/")); // 打包到的目录
};

// 转化公有less 添加前缀并压缩
const cssPubHandler = function () {
  return gulp
    .src("./src/accets/*.less")
    .pipe(
      less({
        paths: [path.join(__dirname, "less", "includes")],
        plugins: [autoprefix],
      })
    )
    .pipe(cleanCSS())
    .pipe(cssmin()) // css 代码压缩
    .pipe(rename({ extname: ".min.css" }))
    .pipe(gulp.dest("./dist/accets/")); // 打包到的目录
};

// 压缩首页
const htmlHomeHandler = function (cb) {
  cb();
  return gulp
    .src("./src/*.html")
    .pipe(
      fileinclude({
        prefix: "@@",
      })
    )
    .pipe(
      htmlmin({
        collapseWhitespace: true, // 去重空格
        removeEmptyAttributes: true,
        minifyCSS: true, //压缩 html 的 style
        minifyJS: true,
        minifyURLs: true,
      })
    )
    .pipe(rename({ extname: ".min.html" }))
    .pipe(gulp.dest("./dist/"));
};

// 压缩页面
const htmlProductsHandler = function () {
  return gulp
    .src("./src/pages/**/*.html")
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(
      htmlmin({
        collapseWhitespace: true, // 去重空格
        removeEmptyAttributes: true,
        minifyCSS: true, //压缩 html 的 style
        minifyJS: true,
        minifyURLs: true,
      })
    )
    .pipe(rename({ extname: ".min.html" }))
    .pipe(gulp.dest("./dist/pages/"));
};

// 打包页面压缩js文件
const jsHandler = function () {
  return gulp
    .src("./src/pages/**/*.js")
    .pipe(uglify()) // js 代码压缩
    .pipe(rename({ extname: ".min.js" }))
    .pipe(gulp.dest("./dist/pages")); // 打包到的目录
};

// 打包组件压缩js文件
const jsCompontHandler = function () {
  return gulp
    .src("./src/components/**/*.js")
    .pipe(uglify()) // js 代码压缩
    .pipe(rename({ extname: ".min.js" }))
    .pipe(gulp.dest("./dist/components")); // 打包到的目录
};

// 转化组件less 添加前缀并压缩
const cssCompontHandler = function () {
  return gulp
    .src("./src/components/**/*.less")
    .pipe(
      less({
        paths: [path.join(__dirname, "less", "includes")],
        plugins: [autoprefix],
      })
    )
    .pipe(cleanCSS())
    .pipe(cssmin()) // css 代码压缩
    .pipe(rename({ extname: ".min.css" }))
    .pipe(gulp.dest("./dist/components/")); // 打包到的目录
};

// 转移jq文件
const jQueryHandler = function () {
  return gulp
    .src("./node_modules/jquery/dist/jquery.min.js")
    .pipe(gulp.dest("./dist/lib")); // 打包到的目录
};

// 转移第三方文件
const otherHandler = function () {
  return gulp
    .src("./src/lib/**")
    .pipe(gulp.dest("./dist/lib")); // 打包到的目录
};

// 打包图片
const imgHandler = function () {
  return gulp
    .src("./src/assets/img/*.*")
    .pipe(imagemin())
    .pipe(gulp.dest("./dist/assets/img"));
};

// 清除dist文件夹下的所有文件
const clearDistFile = function () {
  return gulp.src(["dist/*"]).pipe(clearDist());
};

// 监听文件变化
const watchFile = function () {
  gulp.watch("src/**/*.less", cssHandler);
  gulp.watch("src/**/*.js", jsHandler);
  gulp.watch("src/**/*.html", htmlProductsHandler, htmlHomeHandler);
};

// 开启本地服务，代理接口
const serverHandler = function () {
  return gulp.src("./dist").pipe(
    server({
      host: "127.0.0.1",
      prot: "8080",
      livereload: true,
      open: "./pages/index/index.min.html",
      proxies: [
        {
          source: "/api/v1",
          target: "http://192.168.101.13:8080/api/v1/",
        },
      ],
    })
  );
};
module.exports.dev = gulp.series(
  clearDistFile,
  gulp.parallel(
    cssHandler,
    cssPubHandler,
    otherHandler,
    htmlHomeHandler,
    jsHandler,
    htmlProductsHandler,
    jsCompontHandler,
    cssCompontHandler,
    imgHandler,
    jQueryHandler
  ),
  serverHandler,
  watchFile
);
