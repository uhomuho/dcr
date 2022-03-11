const { DataTypes, Model } = require("sequelize")

module.exports = sequelize => {
  class Member extends Model {}
  
  Member.init({
    name: DataTypes.TEXT,
    email: DataTypes.TEXT,
    birthday: DataTypes.DATE,
    phone: DataTypes.TEXT,
    extra_phone: DataTypes.TEXT
    // messengers
  }, {
		modelName: "member",
		sequelize
	})

  return Member
}