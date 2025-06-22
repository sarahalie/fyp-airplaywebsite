'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Shapes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      themeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Themes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      svgPath: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      difficulty: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      orderInTheme: {
        type: Sequelize.INTEGER,
        allowNull: false
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

    // Add index for theme ordering
    await queryInterface.addIndex('Shapes', ['themeId', 'orderInTheme'], {
      unique: true,
      name: 'shapes_theme_order_idx'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Shapes');
  }
}; 