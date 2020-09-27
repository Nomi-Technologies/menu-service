'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Dish', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true
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
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Restaurant',
          key: 'id',
          as: 'restaurantId'
        }
      },
      categoryId: {
        type: Sequelize.UUID,
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