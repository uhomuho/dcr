const { DataTypes, Model } = require("sequelize")

module.exports = sequelize => {
	class Option extends Model {}

	Option.init({
		engine_volume: DataTypes.FLOAT, // л.
		power: DataTypes.FLOAT, // л.с.
		max_speed: DataTypes.FLOAT, // км/ч
		to_100: DataTypes.TEXT, // с.
		transmission_ru: DataTypes.TEXT,
		transmission_en: DataTypes.TEXT,
		seats: DataTypes.INTEGER, // место, места, мест
		navigation: DataTypes.BOOLEAN,
		equipment: DataTypes.JSONB
	}, {
		modelName: "option",
		timestamps: false,
		sequelize
	})

	return Option
}