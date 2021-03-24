const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ModificationTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ModificationTag.belongsTo(models.Modification, { foreignKey: 'modificationId', targetKey: 'id', as: 'Modification' });
      ModificationTag.belongsTo(models.Tag, { foreignKey: 'tagId', targetKey: 'id', as: 'Tag' });
    }
  }
  ModificationTag.init({
    modificationId: DataTypes.UUID,
    tagId: DataTypes.UUID,
    addToDish: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'ModificationTag',
  });
  return ModificationTag;
};
