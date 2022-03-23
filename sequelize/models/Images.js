const { DataTypes, Model } = require("sequelize")

module.exports = sequelize => {
	class Image extends Model {}

	Image.init({
		name: DataTypes.TEXT,
		position: DataTypes.INTEGER,
		main: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	}, {
		modelName: "image",
		timestamps: false,
		sequelize
	})

	return Image
}