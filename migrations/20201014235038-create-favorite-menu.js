'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('FavoriteMenu', {
      menuId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Menu',
          key: 'id',
          as: 'menuId'
        }        
      },
      userId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'User',
          key: 'id',
          as: 'userId'
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('FavoriteMenu');
  }
};