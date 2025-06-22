const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.GameProgress, {
        foreignKey: 'userId',
        as: 'progress'
      });
    }
  }

  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('student', 'parent', 'teacher'),
      defaultValue: 'student'
    },
    lastLogin: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true
  });

  return User;
}; 