const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ModificationDiet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ModificationDiet.belongsTo(models.Modification, { foreignKey: 'modificationId', targetKey: 'id', as: 'Modification' });
      ModificationDiet.belongsTo(models.Diet, { foreignKey: 'dietId', targetKey: 'id', as: 'Diet' });
    }
  }

  ModificationDiet.init({
    modificationId: DataTypes.UUID,
    dietId: DataTypes.UUID,
    addToDish: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'ModificationDiet',
  });
  return ModificationDiet;
};
