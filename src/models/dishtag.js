module.exports = (sequelize, DataTypes) => {
  const DishTag = sequelize.define('DishTag', {
    dishId: {
      primaryKey: true,
      type: DataTypes.UUID,
      allowNull: false,
    },
    tagId: {
      primaryKey: true,
      type: DataTypes.UUID,
      allowNull: false,
    },
    removable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {});
  DishTag.associate = (models) => {
    // associations can be defined here
    DishTag.belongsTo(models.Dish, { foreignKey: 'dishId', targetKey: 'id', as: 'Dish' });
    DishTag.belongsTo(models.Tag, { foreignKey: 'tagId', targetKey: 'id', as: 'Tag' });
  };
  return DishTag;
};
