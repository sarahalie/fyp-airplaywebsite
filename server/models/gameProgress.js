const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class GameProgress extends Model {
    static associate(models) {
      GameProgress.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }

  GameProgress.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    gameType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    level: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    timeSpent: {
      type: DataTypes.INTEGER, // in seconds
      defaultValue: 0
    },
    completedAt: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'GameProgress',
    timestamps: true
  });

  return GameProgress;
}; 