const { DataTypes, Model } = require("sequelize")

module.exports = sequelize => {
	class Car extends Model {}

	Car.init({
		name: DataTypes.TEXT,
		path: DataTypes.TEXT,
		price: DataTypes.FLOAT,
		deposit: DataTypes.FLOAT,
		show: DataTypes.BOOLEAN,
		year: DataTypes.INTEGER,
		freeDelivery: DataTypes.BOOLEAN,
		fastDelivery: DataTypes.BOOLEAN
	}, {
		modelName: "car",
		timestamps: false,
		sequelize
	})

	return Car
}