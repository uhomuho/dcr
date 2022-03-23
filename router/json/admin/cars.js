const { Router } = require("express"),
			{ models: { brand: Brand, car: Car, meta: Meta, option: Option, image: Image } } = require("../../../sequelize"),
			randToken = require("rand-token"),
			{ Op } = require("sequelize"),
			multer = require("~s/multer"),
			upload = require("~s/upload"),
			remove = require("~s/remove")

const router = Router()

router.route("/")
	.get(( req, res ) => {
		const { limit, page, keyword } = req.query

		let params = {
			where: {}
		}

		if (keyword && !!keyword.length)
			params.where = { name: { [Op.iLike]: keyword } }

		Car.findAndCountAll()
			.then(({ count: total }) => {
				params = {
					...params,
					include: [ Image, Brand ],
					offset: ( page - 1 ) * limit,
					limit
				}

				Car.findAll(params)
					.then(cars => res.send(({ total, cars })))
			})
	})

router.route("/create")
	.post(multer("files", 5), ( req, res ) => {
		const { car, brand, options, meta } = JSON.parse(req.body.data),
					{ files } = req

		Car.create(car).then(async car => {
			const carData = [ 
				car.setBrand( await Brand.findByPk(brand.id) ), car.createOption(options),
				...Object.keys(meta).map(lang => car.createMeta({ ...meta[lang], lang }))
			]

			const uploads = []
			for (let i in files) {
				const file = files[i]
				let name = `${car.slug}_${randToken.generate(4)}`

				uploads.push(
					upload(file, name)
				)

				carData.push(
					car.createImage({ name, position: i, main: i == 0 })
				)
			}

			Promise.all([ ...carData, ...uploads ])
				.then(() => res.sendStatus(200))
				.catch(err => {
					console.error(err)
					res.status(500)
					res.send({ message: "Что-то пошло не так" })
				})
		})
	})

router.route("/check")
	.post(( req, res ) => {
		const { slug, brand: id, exclude } = req.body

		Brand.findByPk(id)
			.then(brand => {
				brand.getCars({ where: { slug, id: { [Op.not]: exclude || 0 } } })
					.then(cars => res.send(!!cars.length))
			})
	})

router.route("/:id")
	.get(( req, res ) => {
		Car.findByPk(req.params.id).then(async car => {
			if (!car) return res.sendStatus(404)

			const [ brand, db_meta, options, images ] = await Promise.all([
				car.getBrand(), car.getMetas(), car.getOption(), car.getImages({ order: [ ["position", "ASC"] ] })
			])
			
			const meta = {}
			db_meta.forEach(item => meta[item.lang] = item)
			
			res.send({ car, brand, meta, options, images })
		})
	})
	.put(multer("files", 5), ( req, res ) => {
		const { car, brand, options, meta, images } = JSON.parse(req.body.data),
					{ files } = req

		Car.findByPk(req.params.id).then(async db_car => {
			const updates = []

			if (images && !!images.length) {
				console.log("Проверяем, какие картинки удалили")
				for (let image of await db_car.getImages()) {
					let exist = images.find(({ id }) => image.id == id)

					if (!exist) {
						console.log("Нет такой картинки, удаляем")
						await Promise.all([ remove(image.name), image.destroy() ]).catch(console.error)
					} else {
						console.log("Картинка есть, сохраняем")
						exist.main = exist.position == 0
						updates.push( image.update(exist) )
					}
				}
			}

			console.log("Загружаем новые картиночки, если они есть")
			const uploads = []
			if (!!files.length) {
				for (let file of files) {
					const position = parseInt(file.originalname.split(".")[0])
					let name = `${db_car.slug}_${randToken.generate(4)}`

					uploads.push(
						upload(file, name)
					)

					updates.push(
						db_car.createImage({ name, position, main: position == 0 })
					)
				}
			}

			console.log("Достаём все данные из бд")

			if (brand && db_brand.id !== brand.id) {
				const db_brand = await db_car.getBrand()
				console.log("Меняем бренд")
				const new_brand = await Brand.findByPk(brand.id)
				updates.push( db_car.setBrand(new_brand) )
			}

			if (options) {
				const db_options = await db_car.getOption()
				updates.push( db_options.update(options) )
			}

			if (meta) {
				const db_meta = await db_car.getMetas()
				updates.push( ...db_meta.map(m => m.update( meta[m.lang] )) )
			}

			console.log("Добавляем все обновления в очередь")
			updates.push( db_car.update(car) )

			console.log("Ждём, когда всё обновится")
			await Promise.all([ ...uploads, ...updates ]).catch(console.error)

			res.sendStatus(200)
		})
	})
	.delete(( req, res ) => {
		Car.findByPk(req.params.id).then(async car => {
			const [ options, meta, images ] = await Promise.all([
				car.getOption(), car.getMetas(), car.getImages()
			])
			
			const removes = [ car.destroy() ]

			if (options) 
				removes.push( options.destroy() )

			if (!!meta.length)
				removes.push( ...meta.map(item => item.destroy()) )

			if (!!images.length)
				remove.push( ...images.map(({ name }) => remove(name)), ...images.map(item => item.destroy()) )

			res.sendStatus(200)
		})
	})

module.exports = router