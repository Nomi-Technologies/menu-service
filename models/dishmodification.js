'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DishModification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DishModification.belongsTo(models.Modification, { foreignKey: 'modificationId', targetKey: 'id', as: "Modification" });
      DishModification.belongsTo(models.Dish, { foreignKey: 'dishId', targetKey: 'id', as: "Dish" });
    }
  };
  DishModification.init({
    modificationId: DataTypes.UUID,
    dishId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'DishModification',
  });
  return DishModification;
};