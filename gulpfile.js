const gulp      = require('gulp'), // Подключаем Gulp
    sass        = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync = require('browser-sync'), // Подключаем Browser Sync
    autoprefixer = require('gulp-autoprefixer'), // Подключаем библиотеку для автоматического добавления префиксов
    del         = require('del'), // Подключаем библиотеку для удаления файлов и папок
    imagemin    = require('gulp-imagemin'),
    imageminMozjpeg = require('imagemin-mozjpeg');

let build = { // Переменные для перемещения в prodaction
   'html': 'src/index.html',
   'css': 'src/css/style.css',
   'php': 'src/mail.php',
   'js': 'src/js/script.js',
   'jq': 'src/js/jquery.min.js',
   'img': 'src/img/**/*.*',
   //'icons': 'src/images/other',
   //'fonts': 'src/fonts/**/*.ttf'
},
    raw = { // Переменные для прелбразования
      'scss': 'src/scss/style.scss',
       'css': [
           'src/fonts/fonts.css',
           'src/css/zeroing.css',
           'src/css/style.css'
       ],
    },
    destDew = {
      'css': 'src/css'
    };

// Development

// Обработка scss файлов

gulp.task('sass', async function(){ // Создаем таск Sass
   return gulp.src(raw.scss) // Берем источник
       .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
       .pipe(autoprefixer()) // Добавление префиксов
       .pipe(gulp.dest(destDew.css)) // Выгружаем результата в папку src/css
});

// Конкатенация, добавление префиксрв и минимизация css файлов в main.css

/*gulp.task('concatCss', function () {
   return gulp.src(raw.css)
       .pipe(concat('main.css')) // Создаем файл main.css
       .pipe(autoprefixer()) // Добавление префиксов
       .pipe(gulp.dest(destDew.css))
});*/

// Создаем web-сервер

gulp.task('browser-sync', async function() { // Создаем таск browser-sync
   browserSync({ // Выполняем browser Sync
      server: { // Определяем параметры сервера
         baseDir: 'src' // Директория для сервера - src
      },
      notify: false // Отключаем уведомления
   });
});

// Перезагрузка страницы

gulp.task('reload', async function () {
   return gulp.src(build.html) // Отправляем в перезагрузку index.html
       .pipe(browserSync.reload({ stream: true }))
});

// Отслеживание изменения в файлах

gulp.task('watch', async function() {
   gulp.watch([build.html, build.css, build.js], gulp.parallel('reload')); // Наблюдение за HTML, css

   gulp.watch(raw.scss, gulp.parallel('sass')); // Наблюдение за sass файлами
   //gulp.watch(raw.css, gulp.parallel('concatCss')); // Наблюдение за css файлами
});

// Запуск по default

gulp.task('default',
    gulp.series(
        'sass',
        //'concatCss',
        gulp.parallel('browser-sync', 'watch')
    ));

// Prodaction

// Очистка папки dist

gulp.task('clean', async function() {
   return del.sync(['public/**/*.*', '!dist/img']); // Удаляем папку dist перед сборкой
});

// Перемещение в dist

gulp.task('move', async function () {
    gulp.src(build.html)
        .pipe(gulp.dest('public'));
    gulp.src(build.php)
        .pipe(gulp.dest('public'));
    gulp.src(build.css)
        .pipe(gulp.dest('public/css'));
    gulp.src(build.js)
        .pipe(gulp.dest('public/js'));
    gulp.src(build.jq)
        .pipe(gulp.dest('public/js'));
    //gulp.src(build.fonts)
    //   .pipe(gulp.dest('dist'));
});

// Оптимизация и перенос изображений

gulp.task('buildimg', async function () {
   gulp.src(build.img)
       .pipe(imagemin([imageminMozjpeg({
           quality: 90,
           progressive: true
       })]))
       .pipe(gulp.dest('public/img'));
});

// Сборка проекта

gulp.task('build', gulp.series('clean', gulp.parallel('sass', 'buildimg'), 'move'));