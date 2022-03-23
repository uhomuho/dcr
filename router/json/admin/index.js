const { Router } = require("express"),
			fs = require("fs"),
			auth = require("./middleware/auth")

const router = Router()

fs.readdirSync(__dirname, { withFileTypes: true }).forEach(file => {
  if (file.name !== 'index.js' && file.isFile()) {
		let name = file.name.replace(".js", "")

		if (name == "auth")
			router.use(`/${name}`, require(`./${file.name}`))
		else
			router.use(`/${name}`, auth, require(`./${file.name}`))
  }
})

module.exports = router