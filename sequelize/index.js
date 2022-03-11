const { Sequelize } = require("sequelize")

const connection = new Sequelize(process.env.DB_URL, {
	dialect: 'postgres',
	protocol: 'postgres',
	dialectOptions: {},
	logging: false
})

connection.authenticate()
	.then(() => console.log("DB storage connected"))
	.catch(console.error)

require("./models")(connection)

module.exports = connection