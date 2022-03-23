const { Router } = require("express"),
			bcrypt = require("bcrypt"),
			randToken = require("rand-token"),
			{ err } = require("../common"),
			{ models: { user } } = require("../../../sequelize")

const router = Router()

router.route("/")
	.post(( req, res ) => {
		const { username, password } = req.body

		user.findOne({ where: { username }, attributes: { exclude: ['loginAt'] } })
			.then(user => {
				if (!user)
					return err(res, "Пользователя не сущетсвует", 422)
				
				bcrypt.compare(password, user.hash)
					.then(async valid => {
						if (!valid) 
							return err(res, "Пароль не подходит", 401)

						const token = randToken.generate(32)

						res.cookie('a_token', token,  { 
							maxAge: 7 * 24 * 60 * 60 * 1000,
							httpOnly: true,
							secure: process.env.NODE_ENV === 'production'? true: false
						})

						user.token = token

						await user.save()

						res.send(user)
					})
			})
	})

router.route("/token")
	.post(( req, res ) => {
		const token = req.cookies['a_token']

		if (!token)
			return res.sendStatus(401)

		user.findOne({ where: { token }, attributes: { exclude: ['token', 'hash', 'loginAt'] } })
			.then(user => {
				if (!user) {
					res.clearCookie("a_token")
					return res.sendStatus(401)
				}
				res.send(user)
			})
	})

module.exports = router