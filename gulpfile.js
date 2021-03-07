const {
    stream
} = require('browser-sync');
const { dest } = require('gulp');
var gulp = require('gulp'),//npm i gulp --save-dev
    sass = require('gulp-sass'), //npm i gulp-sass --save-dev
    browser_sync = require('browser-sync'), //npm i browser-sync --save-dev 
    //del = require('del'), //npm i del --save-dev
    imagemin = require('gulp-imagemin'), //npm i gulp-imagemin imagemin-pngquant --save-dev
    pngquant = require('imagemin-pngquant'), //npm i gulp-imagemin imagemin-pngquant --save-dev
    cache = require('gulp-cache'), //npm i gulp-cache --save-dev
    autoprefixer = require('gulp-autoprefixer') //npm i --save-dev gulp-autoprefixer

gulp.task('scss', function () { // Создаем таск "sass"
    return gulp.src('app/pages/services/css/**/*.scss') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
            cascade: true
        })) // Создаем префиксы
        .pipe(gulp.dest('app/pages/services/css')) // Выгружаем результата в папку app/css
        .pipe(browser_sync.reload({
            stream: true
        }))
});

gulp.task('scss', function () { // Создаем таск "sass"
    return gulp.src('app/pages/services/css/**/*.scss') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
            cascade: true
        })) // Создаем префиксы
        .pipe(gulp.dest('app/pages/services/css')) // Выгружаем результата в папку app/css
        .pipe(browser_sync.reload({
            stream: true
        }))
});

// вводил gulp scss  

gulp.task('browser_sync', function () {
    browser_sync({
        server: {
            baseDir: 'app/pages/services',

        },
        notify: false
    })
})

gulp.task('html', function () {
    return gulp.src('app/pages/services/**/*.html')
        .pipe(browser_sync.reload({
            stream: true
        }))
})

gulp.task('scripts', function () {
    return gulp.src(['app/pages/services/js/**/*.js', 'app/pages/services/libs**/*.js'])
        .pipe(browser_sync.reload({
            stream: true
        }))
})


gulp.task('watch', function () {
    gulp.watch('app/pages/services/css/**/*.scss', gulp.parallel('scss'));
    gulp.watch('app/pages/services/**/*.html', gulp.parallel('html'))
    gulp.watch(['app/pages/services/js/**/*.js', 'app/pages/services/libs/**/*.js'], gulp.parallel('scripts'))
})

//вводил gulp watch


//для итоговой папки dist

/*gulp.task('clean', function () {
    return del.sync('dist/')// удалит папку dist
})*/
 
gulp.task('img', function () {
    return gulp.src('app/pages/services/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        })))
        .pipe(dest('dist/pages/services/img'))
}) 
 
gulp.task('prebuild', async function () {
    let buildCss = gulp.src([
        'app/pages/services/css/**/*.css',
        'app/pages/services/css/**/*.scss',
    ])
        .pipe(gulp.dest('dist/pages/services/css'))

    let buildJs = gulp.src('app/pages/home/js/**/*.js')
        .pipe(gulp.dest('dist/pages/services/js'));

    let buildHtml = gulp.src('app/pages/services/**/*.html')
        .pipe(gulp.dest('dist/pages/services'));
 
    let buildLibs = gulp.src("app/pages/services/libs/**/*")
        .pipe(gulp.dest("dist/pages/services/libs"))

    let buildRobotsFile = gulp.src("app/pages/robots.txt")
    .pipe(gulp.dest("dist/pages"))
})

gulp.task('clear', function () {
    return cache.clearAll()//удалит кеш
})


gulp.task('default', gulp.parallel('scss', 'scripts', 'browser_sync', 'watch'))
gulp.task('build', gulp.parallel('prebuild', 'img', 'scss', 'scss', 'scripts'))
//gulp build