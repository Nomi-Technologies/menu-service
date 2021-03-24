const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Modification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Modification.belongsTo(models.Restaurant, {
        foreignKey: 'restaurantId',
        onDelete: 'CASCADE',
      });
      Modification.belongsToMany(models.Tag, {
        through: 'ModificationTag',
        as: 'Tags',
        foreignKey: 'modificationId',
        otherKey: 'tagId',
      });
      Modification.belongsToMany(models.Diet, {
        through: 'ModificationDiet',
        as: 'Diets',
        foreignKey: 'modificationId',
        otherKey: 'dietId',
      });
      Modification.belongsToMany(models.Dish, {
        through: 'DishModification',
        as: 'Dishes',
        foreignKey: 'modificationId',
        otherKey: 'dishId',
      });
    }
  }
  Modification.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    restaurantId: DataTypes.UUID,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Modification',
  });
  return Modification;
};
