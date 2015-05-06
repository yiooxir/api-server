var gulp = require('gulp');
var yuidoc = require("gulp-yuidoc");

gulp.task('doc', function() {
    gulp.src("./app/models/*")
        .pipe(yuidoc())
        .pipe(gulp.dest("./doc"));
});

