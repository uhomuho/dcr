const { DataTypes, Model } = require("sequelize")

module.exports = sequelize => {
	class Brand extends Model {}

	Brand.init({
		name: DataTypes.TEXT,
		slug: DataTypes.TEXT,
		order: DataTypes.INTEGER
	}, {
		modelName: "brand",
		timestamps: false,
		sequelize
	})

	return Brand
}