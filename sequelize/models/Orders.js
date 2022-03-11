const { DataTypes, Model } = require("sequelize")

module.exports = sequelize => {
  class Order extends Model {}

  Order.init({
    receiving: DataTypes.TEXT,
    return: DataTypes.TEXT,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    watched: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    comment: DataTypes.TEXT,
    paid: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    price: DataTypes.INTEGER
  }, {
		modelName: "order",
		updatedAt: false,
		sequelize
	})

  return Order
}