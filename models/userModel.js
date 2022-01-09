const sequelize= require('./index')
const {DataTypes}= require('sequelize')

const User = sequelize.define('User', {
    _ID:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false, primaryKey: true
    },
    _userName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    _password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    _firstName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    _lastName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    _phone:{
        type: DataTypes.STRING,
        allowNull: false
    },
    _email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    _address:{
        type: DataTypes.STRING,
        allowNull: false
    },
    _avatar:{
        type: DataTypes.STRING
    },
    _activationString:{
        type: DataTypes.STRING
    }, 
    _isActivated:{
        type: DataTypes.BOOLEAN
    }, 
    _isBanned:{
        type: DataTypes.BOOLEAN
    }
  },{
      tableName: 'User',
      timestamps: false
  });
  
  module.exports=User