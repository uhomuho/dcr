const { Router } = require("express"),
			{ models: { brand } } = require("../../../sequelize")

const router = Router()

router.route("/")
	.get(( req, res ) => {
		brand.findAll({ raw: true })
			.then(res.send)
			.catch(err => {
				console.error(err)
				res.sendStatus(500)
			})
	})

module.exports = router