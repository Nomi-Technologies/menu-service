'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Dish', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      addons: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      canRemove: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      notes: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      tableTalkPoints: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: '',
      },
      price: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      restaurantId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Restaurant',
          key: 'id',
          as: 'restaurantId'
        }
      },
      categoryId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Category',
          key: 'id',
          as: 'categoryId'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Dish');
  }
};