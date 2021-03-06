var gulp = require('gulp');
var notify = require('gulp-notify');
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
var config = require('../config');
var browserSync = require('browser-sync');
reload = browserSync.reload;

var timeStamp = Math.round(Date.now() / 1000);

var fontname = 'svgfont';
gulp.task('font', function() {
	return gulp.src(config.src.img + 'svg/*.svg')
		// .pipe(svgmin())
		.pipe(iconfont({
			fontName: fontname,
			appendUnicode: true,
			formats: ['ttf', 'eot', 'woff', 'woff2'],
			normalize: true,
			fontHeight: 1001,
			fontStyle: 'normal',
			fontWeight: 'normal'
		}))
		.on('glyphs', function(glyphs, options) {
				console.log(glyphs);
				gulp.src(config.src.helpers + '_svgfont.sass')
						.pipe(consolidate('lodash', {
								glyphs: glyphs,
								fontName: fontname,
								fontPath: '../fonts/',
								className: 'icon',
								timeStamp: timeStamp
						}))
						.pipe(gulp.dest(config.src.sass + 'lib/'));
				gulp.src(config.src.helpers + 'icons.html')
						.pipe(consolidate('lodash', {
								glyphs: glyphs,
								fontName: fontname,
								timeStamp: timeStamp,
								fontPath: '../fonts/',
								className: 'icon',
								htmlBefore: '<i class="icon ',
								htmlAfter: '"></i>',
								htmlBr: ''
						}))
						.pipe(gulp.dest(config.dest.root));
		})
		.pipe(gulp.dest(config.dest.root + 'fonts/'))
		.pipe(reload({stream: true}))
		.pipe(notify('Icon font updated!'));
});

gulp.task('font:watch', function() {
		gulp.watch(config.src.img + 'svg/*', ['font']);
});