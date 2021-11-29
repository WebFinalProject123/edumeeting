const sequelize= require('./index')
const {DataTypes, Model}= require('sequelize')
const Class_schedule = sequelize.define('Class_schedule', {
    // Model attributes are defined here
    _schedule_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    _class_ID:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    }
  },{
      tableName: 'Class_schedule',
      timestamps: false
  });
  module.exports=Class_schedule
  