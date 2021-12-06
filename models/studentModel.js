const sequelize= require('./index')
const {DataTypes}= require('sequelize')

const Student = sequelize.define('Student', {
    _student_ID:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false, primaryKey: true
    },
    _user_ID:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    _balance:{
        type: DataTypes.FLOAT
    }
  },{
      tableName: 'Student',
      timestamps: false
  });
  
  module.exports=Student