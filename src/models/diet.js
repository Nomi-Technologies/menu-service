const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Diet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Diet.belongsToMany(models.Dish, {
        through: 'DishDiet',
        as: 'Dishes',
        foreignKey: 'dietId',
        otherKey: 'dishId',
      });
      Diet.belongsToMany(models.Modification, {
        through: 'ModificationDiet',
        as: 'Modifications',
        foreignKey: 'dietId',
        otherKey: 'modificationId',
      });
    }
  }

  Diet.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Diet',
  });
  return Diet;
};
