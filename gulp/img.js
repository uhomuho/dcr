const { wrapper } = require("./common"),
			minify = require("gulp-imagemin"),
			webp = require("gulp-webp"),
			gulpif = require("gulp-if")

const condition = File => {
	const file = File.path.split(/(\\|\/)/g).pop()
	const ext = file.split(".").pop()

	return ext !== "svg"
}

const minifyOptions = [
	minify.gifsicle({interlaced: true}),
	minify.mozjpeg({quality: 75, progressive: true}),
	minify.optipng({optimizationLevel: 5}),
	minify.svgo({
		plugins: [
			{removeViewBox: true},
			{cleanupIDs: false}
		]
	})
]

module.exports = (file = null) => {
	return wrapper("src/img", ["img"], (smc, stream) => {
		return stream()
			.pipe( minify(minifyOptions) )
			.pipe( gulpif(condition, webp()) )
	}, file)
}