const sequelize= require('./index')
const {DataTypes, Model}= require('sequelize')
const teacher= require('../models/teacherModel')
const Class = sequelize.define('Class', {
    // Model attributes are defined here
    _class_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    _course_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    _className:{
        type: DataTypes.STRING,
        allowNull: false
    },
    _startDate:{
        type: DataTypes.DATE,
        allowNull: false
    },
    _endDate:{
        type: DataTypes.DATE,
        allowNull: false
    },
    _maxNumber:{
        type: DataTypes.INTEGER
    },
    _currentNumber:{
        type: DataTypes.INTEGER
    },
    _room:{
        type: DataTypes.STRING,
        allowNull: true
    },
    _numberOfLesson:{
        type: DataTypes.INTEGER
    },
    _teacher_ID:{
        type: DataTypes.INTEGER
    },
    _schedule_ID_1:{
        type: DataTypes.INTEGER
    },
    _schedule_ID_2:{
        type: DataTypes.INTEGER
    }
  },{
      tableName: 'Class',
      timestamps: false
  });
  Class.belongsTo(teacher, {foreignKey: '_teacher_ID', targetKey: '_teacher_ID'})
  module.exports=Class
  