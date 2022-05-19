var gulp = require('gulp'),
	sass = require('gulp-sass')(require('sass')),
	pug = require('gulp-pug'),
	del = require('del'), // Подключаем библиотеку для удаления файлов и папок
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync'); // Подключаем Browser Sync;

gulp.task('clean', function clean2() {
	return del.sync('build'); // Удаляем папку dist перед сборкой // это реши
});

gulp.task('pug', function () { // Создаем таск "pug"
	return gulp.src('app/pages/*.pug') // Берем источник
		.pipe(pug({
			pretty: true,
		})) // Преобразуем Pug в html посредством gulp-pug
		.pipe(gulp.dest('build')) // Выгружаем результат в папку build
		.pipe(browserSync.reload({ stream: true })) // Обновляем pug на странице при изменении
});

gulp.task('sass', function () { // Создаем таск "sass"
	return gulp.src('app/scss/main.scss') // Берем источник
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['> 0.1%'],
			overrideBrowserslist: ['last 5 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('build/css'))
		.pipe(browserSync.reload({ stream: true })) // Обновляем CSS на странице при изменении
});

gulp.task('style-libs-css', function () { // Создаем таск "sass"
	return gulp.src('app/scss/libs/*.css') // Берем источник
		.pipe(gulp.dest('build/css/libs'))
		.pipe(browserSync.reload({ stream: true })) // Обновляем CSS на странице при изменении
});

gulp.task('style-libs-scss', function () { // Создаем таск "sass"
	return gulp.src('app/scss/libs/*.css') // Берем источник
		.pipe(gulp.dest('build/css/libs'))
		.pipe(browserSync.reload({ stream: true })) // Обновляем CSS на странице при изменении
});

gulp.task('scripts-libs', function () {
	return gulp.src('app/js/libs/*.js')
		.pipe(gulp.dest('build/js/libs')) // Выгружаем результата в папку build/pages
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('scripts', function () {
	return gulp.src('app/js/*.js')
		.pipe(gulp.dest('build/js')) // Выгружаем результата в папку build/pages
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('images', function () {
	return gulp.src('app/images/*')
		.pipe(gulp.dest('build/images')) // Выгружаем результата в папку build/pages
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('browser-sync', function () { // Создаем таск browser-sync
	browserSync({ // Выполняем browser Sync
		server: { // Определяем параметры сервера
			baseDir: 'build' // Директория для сервера - app
		},
		notify: true // Отключаем уведомления
	});
});

gulp.task('watch', function () {
	gulp.watch(['app/blocks/**/*.pug', 'app/pages/*.pug', 'app/layouts/*.pug'], gulp.parallel(['pug']));// Наблюдение за pug файлами
	gulp.watch(['app/scss/libs/*.css'], gulp.parallel(['style-libs-css']));// Наблюдение за библиотеками css 
	gulp.watch(['app/scss/libs/*.scss'], gulp.parallel(['style-libs-scss']));// Наблюдение за библиотеками scss
	gulp.watch(['app/scss/libs/*.css', 'app/blocks/**/*.scss', 'app/scss/help/*.scss', 'app/scss/*.scss'], gulp.parallel(['sass']));// Наблюдение за scss и библиотеками css или scss
	gulp.watch(['app/js/libs/*.js'], gulp.parallel(['scripts-libs']));// Наблюдение за библиотеками js
	gulp.watch(['app/js/*.js'], gulp.parallel(['scripts']));// Наблюдение за главным JS файлом 
	gulp.watch(['app/images'], gulp.parallel(['images']));// Наблюдение за фото
});

gulp.task('default', gulp.parallel('pug', 'style-libs-css', 'style-libs-scss', 'sass', 'scripts-libs', 'scripts', 'images', 'browser-sync', 'watch'));
