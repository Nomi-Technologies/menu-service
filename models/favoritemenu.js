'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FavoriteMenu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FavoriteMenu.belongsTo(models.Menu, { foreignKey: 'menuId', targetKey: 'id', as: "Menu" });
      FavoriteMenu.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: "User" });
    }
  };
  FavoriteMenu.init({
    menuID: DataTypes.UUID,
    userID: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'FavoriteMenu',
  });
  return FavoriteMenu;
};