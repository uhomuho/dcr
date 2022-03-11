const { DataTypes, Model } = require("sequelize")

module.exports = sequelize => {
	class Site extends Model {}

	Site.init({
		url: DataTypes.TEXT
	}, {
		modelName: "site",
		timestamps: false,
		sequelize
	})

	return Site
}