const { DataTypes, Model } = require("sequelize")

module.exports = sequelize => {
	class Car extends Model {}

	Car.init({
		name: DataTypes.TEXT,
		slug: DataTypes.TEXT,
		price: DataTypes.FLOAT,
		deposit: DataTypes.FLOAT,
		show: DataTypes.BOOLEAN,
		year: DataTypes.INTEGER,
		active: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	}, {
		modelName: "car",
		timestamps: false,
		sequelize
	})

	return Car
}