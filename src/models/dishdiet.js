const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DishDiet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DishDiet.belongsTo(models.Diet, { foreignKey: 'dietId', targetKey: 'id', as: 'Diet' });
      DishDiet.belongsTo(models.Dish, { foreignKey: 'dishId', targetKey: 'id', as: 'Dish' });
    }
  }

  DishDiet.init({
    dishId: DataTypes.UUID,
    dietId: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'DishDiet',
  });
  return DishDiet;
};
