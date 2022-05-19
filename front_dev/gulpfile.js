const
    gulp = require('gulp'),
    pug = require('gulp-pug'),
    rename = require("gulp-rename");

const { src, dest, watch } = require("gulp");

// gulp.task('pug-compile', function buildHTML() {
//     return gulp.src('./pug/*.pug')
//         .pipe(pug({
//             pretty: true
//         }))
//         .pipe(rename('./*.html'))
//         .pipe(gulp.dest('./'))
// });

function html() {
  return src("./src/pug/views/*.pug")
    .pipe(pug({pretty: true,}))
    .pipe(dest("./dist"));
}

const concat = require("gulp-concat");
function js() {
  return src("./src/js/*.js")
    .pipe(concat("script.js"))
    .pipe(dest("./dist/assets/"));
}
function css() {
    return src("./src/css/*.css")
    .pipe(concat("main.css"))
    .pipe(dest("./dist/assets/"));
}
// exports.js = js;
// exports.html = html;
exports.watch = function() {
    watch("./src/pug/**/*.pug", html);
    watch("./src/css/**/*.css", css);
    watch("./src/js/*.js", js);
}
