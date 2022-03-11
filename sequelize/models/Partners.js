const { DataTypes, Model } = require("sequelize")

module.exports = sequelize => {
  class Partner extends Model {}

  Partner.init({
    name: DataTypes.TEXT,
    surname: DataTypes.TEXT,
    country: DataTypes.TEXT,
    phone: DataTypes.TEXT,
    email: DataTypes.TEXT,
    requisites: DataTypes.TEXT,
    hash: DataTypes.TEXT,
    token: DataTypes.TEXT
  }, {
		modelName: "partner",
		timestamps: false,
		sequelize
	})

  return Partner
}