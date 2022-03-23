const { models: { user: User } } = require("../../../../sequelize")

module.exports = (req, res, next) => {
	const { a_token } = req.cookies

	if (!a_token)
		return res.sendStatus(401)

	return User.findOne({ where: { token: a_token } })
		.then(user => {
			if (!user) {
				res.clearCookie('a_token')
				return res.sendStatus(401)
			}
			next()
		})
}