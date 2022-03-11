const { DataTypes, Model } = require("sequelize")

module.exports = sequelize => {
	class User extends Model {}

	User.init({
		username: DataTypes.TEXT,
		hash: DataTypes.TEXT,
		token: DataTypes.TEXT,
		loginAt: DataTypes.DATE
	}, {
		modelName: "user",
		timestamps: false,
		sequelize
	})

	return User
}