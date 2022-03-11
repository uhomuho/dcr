const { DataTypes, Model } = require("sequelize")

module.exports = sequelize => {
	class Messenger extends Model {}

	Messenger.init({
		name: DataTypes.TEXT,
		link: DataTypes.TEXT,
		extra: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	}, {
		modelName: "messenger",
		sequelize,
		timestamps: false
	})

	return Messenger
}