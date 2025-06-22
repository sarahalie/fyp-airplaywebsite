'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserBadges', {
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
      badgeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Badges',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      earnedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
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

    // Add unique constraint to prevent duplicate badge awards
    await queryInterface.addIndex('UserBadges', ['userId', 'badgeId'], {
      unique: true,
      name: 'user_badge_idx'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserBadges');
  }
}; 