const fs = require("fs")

module.exports = sequelize => {
	const models = {}

	fs.readdirSync(__dirname).forEach(file => {
		if (file !== 'index.js') {
			var name = file.replace('.js', '');
			models[name] = require('./' + file)(sequelize);
		}
	})

	/**  @cars_relations */
	models.Cars.hasMany(models.Images, { foreignKey: 'carID' })
	models.Cars.belongsTo(models.Brands, { foreignKey: 'brandID' })
	models.Cars.belongsTo(models.Options, { foreignKey: 'optionsID' })
	models.Cars.belongsTo(models.Meta, { foreignKey: 'metaID' })
	models.Cars.hasMany(models.Orders, { foreignKey: 'carID' })

	/**  @orders_relations */
	models.Orders.belongsTo(models.Cars, { foreignKey: 'carID' })
	models.Orders.belongsTo(models.Members, { foreignKey: 'memberID' })

	/**  @members_relations */
	models.Members.hasMany(models.Orders, { foreignKey: 'memberID' })
	models.Members.belongsTo(models.Partners, { foreignKey: 'partnerID' })
	models.Members.hasMany(models.Messengers, { foreignKey: 'memberID' })
	models.Messengers.belongsTo(models.Members, { foreignKey: 'memberID' })

	/**  @images_relations */
	models.Images.belongsTo(models.Cars, { foreignKey: 'carID' })

	/**  @brands_relations */
	models.Brands.belongsTo(models.Meta, { foreignKey: 'metaID' })
	models.Brands.hasMany(models.Cars, { foreignKey: 'brandID' })

	/** @partners_relations */
	models.Sites.belongsTo(models.Partners, { foreignKey: 'partnerID' })
	models.Visits.belongsTo(models.Sites, { foreignKey: 'siteID' })
	models.Sites.hasMany(models.Visits, { foreignKey: 'siteID' })
	models.Visits.belongsTo(models.Partners, { foreignKey: 'partnerID' })
	models.Visits.belongsTo(models.Orders, { foreignKey: 'orderID' })
	models.Orders.hasOne(models.Visits, { foreignKey: 'orderID' })
	models.Partners.hasMany(models.Visits, { foreignKey: 'partnerID' })
	models.Partners.hasMany(models.Sites, { foreignKey: 'partnerID' })
	models.Partners.hasMany(models.Members, { foreignKey: 'partnerID' })

	/** @settings_relations */
	models.Partners.belongsTo(models.Settings, { foreignKey: 'payoutID' })
	models.Settings.hasMany(models.Partners, { foreignKey: 'payoutID' })

	// Sync all models
	sequelize.sync({ alter: true }).then(() => console.log('All models are in sync'))
	// sequelize.sync({ force: true }).then(() => console.log('All models successfully sync'))
}