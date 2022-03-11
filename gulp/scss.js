const { wrapper } = require("./common"),
			sass = require("gulp-sass")(require("sass")),
			autoprefixer = require('gulp-autoprefixer'),
			CleanCSS = require("clean-css"),
			purge = require("gulp-purgecss")

const sassOptions = { includePaths: [ "node_modules", "src/scss" ] }

const autoprefixerOptions = [ ['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true } ]

const purgeOptions = file => {
	return {
		content: [ "views/*.pug", "views/mixins/*.pug", `src/js/**/**/**/${file}.vue` ],
		defaultExtractor: content => {
			const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []
			const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || []
			return broadMatches.concat(innerMatches)
		}
	}
}

module.exports = (file = null, mode = process.env.NODE_ENV) => {
	return wrapper("src/scss", ["scss", "css"], (smc, stream, file) => {
		stream = stream()
			.pipe( sass(sassOptions) )

		if (mode == "production")
			stream = stream
				.pipe( purge( purgeOptions( file.replace(".scss", "") ) ) )
				.pipe( autoprefixer(...autoprefixerOptions) )
				.on("data", file => {
					const bufer = new CleanCSS().minify(file.contents)
					return file.contents = Buffer.from(bufer.styles)
				})

		return stream
	}, file)
}