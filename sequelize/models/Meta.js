const { DataTypes, Model } = require("sequelize")

module.exports = sequelize => {
	class Meta extends Model {}

	Meta.init({
		lang: {
			type: DataTypes.TEXT,
			defaultValue: "en"
		},
		title: DataTypes.TEXT,
		description: DataTypes.TEXT,
		keywords: DataTypes.ARRAY(DataTypes.TEXT),
		views: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		default: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	}, {
		modelName: "meta",
		name: {
			singular: "meta",
			plural: "metas"
		},
		timestamps: false,
		sequelize
	})
	
	return Meta
}