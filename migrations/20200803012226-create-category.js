'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Category', {
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
      menuId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Menu',
          key: 'id',
          as: 'menuId'
        }
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: '',
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
    return queryInterface.dropTable('Category');
  }
};