const { DataTypes, Model } = require("sequelize")

module.exports = sequelize => {
	class Image extends Model {}

	Image.init({
		url: DataTypes.TEXT,
		position: DataTypes.INTEGER,
		main: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		originalname: DataTypes.ARRAY(DataTypes.TEXT)
	}, {
		modelName: "image",
		timestamps: false,
		sequelize
	})

	return Image
}