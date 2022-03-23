console.clear()

require("dotenv").config()

const { series } = require("gulp")

const { webpack, scss, img, clear, watch, autoreload } = require("./gulp")

exports["webpack:dev"] = webpack()
exports["webpack:prod"] = webpack(null, "production")

exports["scss:dev"] = scss()
exports["scss:prod"] = scss(null, "production")

exports["img"] = img()

exports["clear"] = series( clear )

exports["build"] = series( clear, scss(), img(), webpack() )

exports["watch"] = watch
exports["autoreload"] = autoreload