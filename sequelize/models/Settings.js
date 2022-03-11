const { DataTypes, Model } = require("sequelize")

module.exports = sequelize => {
  class Setting extends Model {}

  Setting.init({
    field_name: DataTypes.TEXT,
    field_value: DataTypes.TEXT
  }, {
		modelName: "setting",
		timestamps: false,
		sequelize
	})
  
  return Setting
}

/**
 * -> All settings list
 * @receiving_and_return_variants
 * [ { "ru", "en" } ]
 */