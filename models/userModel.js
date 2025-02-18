'use strict';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false, 
      },
      lastName:  {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      resetPasswordToken: {
        type: DataTypes.STRING,
      },
      resetPasswordExpires: {
        type: DataTypes.STRING,
      }
    },
        {
            tableName: 'User'
        }
    );
    return User;
};