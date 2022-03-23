const { Router } = require("express"),
			{ models: { brand: Brand, meta: Meta } } = require("../../../sequelize"),
			{ Op } = require("sequelize")

const router = Router()

router.route("/")
	.get(( req, res ) => {
		const { limit, page, keyword } = req.query

		let params = {
			where: {}
		}

		if (keyword && !!keyword.length)
			params.where = { name: { [Op.iLike]: keyword } }

		Brand.findAndCountAll()
			.then(({ count: total }) => {
				params = {
					...params,
					offset: ( page - 1 ) * limit,
					limit
				}

				Brand.findAll(params)
					.then(brands => res.send(({ total, brands })))
			})
	})

router.route("/all")
	.get(( req, res ) => {
		Brand.findAll()
			.then(brands => res.send(brands))
	})

router.route("/check")
	.post(( req, res ) => {
		const { slug, exclude } = req.body
		
		Brand.findOne({ where: { slug, id: { [Op.not]: exclude || 0 } } })
			.then(brand => res.send(!!brand))
	})

router.route("/create")
	.post(async ( req, res ) => {
		const { meta: metaData, brand: brandData } = req.body

		try {
			const brand = await Brand.create(brandData)
			const meta = await Promise.all(
				Object.keys(metaData).map(lang => brand.createMeta({ ...metaData[lang], lang }))
			)

			res.sendStatus(200)
		} catch (err) {
			console.log(err)
			res.sendStatus(500)
		}

	})

router.route("/:id")
	.get(( req, res ) => {
		Brand.findByPk(req.params.id).then(async brand => {
			if (!brand) return res.sendStatus(404)

			const meta = {};
			(await brand.getMetas()).forEach(m => meta[m.lang] = m)

			res.send({ brand, meta })
		})
	})
	.put(( req, res ) => {
		const { brand, meta } = req.body

		Brand.findByPk(req.params.id).then(async db_brand => {
			const db_meta = await db_brand.getMetas()

			await Promise.all([
				db_brand.update(brand),
				...db_meta.map(m => m.update( meta[m.lang] ))
			])

			res.sendStatus(200)
		})
	})

module.exports = router