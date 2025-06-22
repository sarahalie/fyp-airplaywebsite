'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserProgress', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      shapeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Shapes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      accuracy: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      timeSpent: {
        type: Sequelize.INTEGER,  // in seconds
        defaultValue: 0
      },
      attempts: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      completedAt: {
        type: Sequelize.DATE,
        allowNull: true
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

    // Add unique constraint to prevent duplicate progress entries
    await queryInterface.addIndex('UserProgress', ['userId', 'shapeId'], {
      unique: true,
      name: 'user_shape_progress_idx'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserProgress');
  }
}; 