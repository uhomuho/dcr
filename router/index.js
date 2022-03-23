const { Router } = require("express"),
			storage = require("~s/storage"),
			stream = require("stream")

const router = Router()

router.route("/cars/:image")
	.get(async ( req, res ) => {
		const { image } = req.params
		
		const f = await storage.getObject("cars", image).catch(() => null)

		if (!f)
			return res.sendStatus(404)

		const ps = new stream.PassThrough()

		stream.pipeline( f, ps,
			err => {
				if (err) {
					console.error(err)
					return res.sendStatus(404)
				}
			}
		)

		ps.pipe(res)
	})

router.use("/json", require("./json"))

router.route("/admin*")
	.get(( req, res ) => res.render("admin", { loading: process.env.NODE_ENV == "production" }))

router.route("*")
	.get(( req, res ) => res.render("client", { loading: process.env.NODE_ENV == "production" }))

module.exports = router