var gulp = require('gulp'),
	sass = require('gulp-sass')(require('sass')),
	pug = require('gulp-pug'),
	del = require('del'), // Подключаем библиотеку для удаления файлов и папок
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync'); // Подключаем Browser Sync;


gulp.task('pug', function () { // Создаем таск "pug"
	return gulp.src('app/pug/pages/*.pug') // Берем источник
		.pipe(pug({
			pretty: true,
		})) // Преобразуем Pug в html посредством gulp-pug
		.pipe(gulp.dest('build')) // Выгружаем результат в папку build
		.pipe(browserSync.reload({ stream: true })) // Обновляем pug на странице при изменении
});

gulp.task('sass', function () { // Создаем таск "sass"
	return gulp.src(['app/scss/differentStyles/*.scss', 'app/scss/repeatStyles/repeatStyles.scss']) // Берем источник
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
	return gulp.src(['app/js/differentScripts/*.js', 'app/js/repeatScripts/repeatScripts.js'])
		.pipe(gulp.dest('build/js')) // Выгружаем результата в папку build/pages
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('images', function () {
	return gulp.src(['app/images/**'])
		.pipe(gulp.dest('build/images')) // Выгружаем результата в папку build/pages
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('fonts', function () {
	return gulp.src('app/fonts/*')
		.pipe(gulp.dest('build/fonts')) // Выгружаем результата в папку build/pages
		.pipe(browserSync.reload({ stream: true }))
});


gulp.task('browser-sync', function () { // Создаем таск browser-sync
	browserSync({ // Выполняем browser Sync
		server: { // Определяем параметры сервера
			baseDir: 'build' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});

gulp.task('watch', function () {
	gulp.watch(['app/pug/**/*.pug', 'app/layoutForPages/**/*.pug'], gulp.parallel(['pug']));// Наблюдение за pug файлами
	gulp.watch(['app/scss/libs/*.css'], gulp.parallel(['style-libs-css']));// Наблюдение за библиотеками css 
	gulp.watch(['app/scss/libs/*.scss'], gulp.parallel(['style-libs-scss']));// Наблюдение за библиотеками scss
	gulp.watch(['app/scss/**/*.scss', 'app/scss/repeatStyles/help/*.scss'], gulp.parallel(['sass']));// Наблюдение за scss и библиотеками css или scss
	gulp.watch(['app/js/libs/*.js'], gulp.parallel(['scripts-libs']));// Наблюдение за библиотеками js
	gulp.watch(['app/js/**/*.js'], gulp.parallel(['scripts']));// Наблюдение за главным JS файлом 
	gulp.watch(['app/images'], gulp.parallel(['images']));// Наблюдение за фото
	gulp.watch('app/fonts', gulp.parallel(['fonts']));// Наблюдение за фото
});
gulp.task('clean', function () {
	del.sync('build'); // Удаляем папку dist перед сборкой // это реши
});

// Для запуска сборщика, который собирает build
// и следит за файлами.
gulp.task('default', gulp.parallel('pug', 'style-libs-css', 'style-libs-scss', 'sass', 'scripts-libs', 'scripts', 'images', 'fonts', 'browser-sync', 'watch'));

// Чистит build и снова его собирает.
gulp.task('cleanAndBuild', gulp.parallel('clean', 'pug', 'style-libs-css', 'style-libs-scss', 'sass', 'scripts-libs', 'scripts', 'images', 'fonts'))