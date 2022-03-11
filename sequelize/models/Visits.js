const { DataTypes, Model } = require("sequelize")

module.exports = sequelize => {
	class Visit extends Model {}

	Visit.init({
		type: DataTypes.TEXT,
		marker: DataTypes.TEXT,
		ip: DataTypes.TEXT
		/** 
			@visit_types
				'link': Переход по ссылке,
				'order': Оформление заказа,
				'register': Регистрация
		*/
	}, {
		modelName: "visit",
		updatedAt: false,
		sequelize
	})

	return Visit
}