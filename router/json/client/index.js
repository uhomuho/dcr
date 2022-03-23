const fs = require('fs'),
			{ Router } = require("express")

const router = Router()

fs.readdirSync(__dirname, { withFileTypes: true }).forEach(file => {
  if (file.name !== 'index.js' && file.isFile()) {
		let name = file.name.replace(".js", "")
		router.use(`/${name}`, require(`./${file.name}`))
  }
})

module.exports = router