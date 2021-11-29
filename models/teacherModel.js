const sequelize= require('./index')
const {DataTypes}= require('sequelize')

const Teacher = sequelize.define('Teacher', {
    _teacher_ID:{
        type: DataTypes.INTEGER,
        allowNull: false, primaryKey: true
    },
    _user_ID:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    _degree:{
        type: DataTypes.STRING
    },
    _startDate:{
        type: DataTypes.DATE
    },
    _salary:{
        type: DataTypes.FLOAT
    }
  },{
      tableName: 'Teacher',
      timestamps: false
  });
  
  module.exports=Teacher