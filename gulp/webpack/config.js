"use strict";

const { VueLoaderPlugin } = require("vue-loader")

module.exports = (params = {}) => {
	const config = { 
		stats: "errors-only", 
		output: { filename: "[name].js" }, 
		module: {
			rules: [
				{
					test: /\.s(c|a)ss$/i,
					use: ["style-loader", "css-loader", "sass-loader"],
				},
				{
					test: /\.css$/i,
					use: ["style-loader", "css-loader"],
				},
				{
					test: /\.svg$/,
					use: [ "vue-loader", "vue-svg-loader" ]
				},
				{
					test: /\.js$/,
					exclude: /(node_modules|server.js)/,
					loader: "babel-loader"
				},
				{
					test: /\.vue$/,
					loader: "vue-loader"
				},
				{
					test: /\.pug$/,
					oneOf: [
						{
							resourceQuery: /^\?vue/,
							use: [ "pug-plain-loader" ]
						},
						{
							use: [ "raw-loader", "pug-plain-loader" ]
						}
					]
				}
			]
		},
		plugins: [
			new VueLoaderPlugin()
		]
	}

	Object.keys(params).forEach(prop => config[prop] = params[prop])

	return config
}