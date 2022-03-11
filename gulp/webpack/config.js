module.exports = (params = {}) => {
	const config = { 
		stats: "errors-only", 
		output: { filename: "[contenthash].js" }, 
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /(node_modules|server.js)/,
					loader: 'babel-loader'
				}
			]
		}
	}

	Object.keys(params).forEach(prop => config[prop] = params[prop])

	return config
}