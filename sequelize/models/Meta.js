const { DataTypes, Model } = require("sequelize")

module.exports = sequelize => {
	class Meta extends Model {}

	Meta.init({
		title_ru: DataTypes.TEXT,
		description_ru: DataTypes.TEXT,
		keywords_ru: DataTypes.ARRAY(DataTypes.TEXT),
		title_en: DataTypes.TEXT,
		description_en: DataTypes.TEXT,
		keywords_en: DataTypes.ARRAY(DataTypes.TEXT),
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
		timestamps: false,
		sequelize
	})
	
	return Meta
}