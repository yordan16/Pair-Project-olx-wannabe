'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Car.belongsTo(models.User)
    }
    static getCarCategory(category) {
      let options = {
        where: {
        },
        order: ["brand"], //[["name", "ASC"]] => ga perlu ASC karena default dari order di sequelize udah ASC, kalo mau DESC baru tambahin sendiri 
        include: 'User' //sequelize.models.Store
      }
      if (category) {
        options.where.category = category
      }
      return Car.findAll(options)
    }
  }
  Car.init({
    brand: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    category: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};