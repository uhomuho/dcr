const webpack = require("webpack-stream"),
			named = require("vinyl-named"),
			{ wrapper } = require("../common"),
			path = require("path")

module.exports = (file = null, mode = process.env.NODE_ENV) => {
	return wrapper("src/js", ["js"], (smc, stream, file) => {
		let config = require("./config")
		config = config({
			mode,
			resolve: {
				alias: {
					"vue": path.join(__dirname, "..", "..", "node_modules", "vue", "dist", "vue.esm-bundler.js"),
					"@": path.join(__dirname, "..", "..", "src", "js", file.replace(".js", "")),
					"@tpl": path.join(__dirname, "..", "..", "src", "js", file.replace(".js", ""), "templates"),
					"@c": path.join(__dirname, "..", "..", "src", "js", file.replace(".js", ""), "components"),
					"@api": path.join(__dirname, "..", "..", "src", "js", file.replace(".js", ""), "api", "controllers"),
					"@p": path.join(__dirname, "..", "..", "public")
				}
			}
		})

		return stream()
			.pipe( named() )
			.pipe( webpack( config ) )
	}, file)
}