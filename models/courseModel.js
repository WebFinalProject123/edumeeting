const sequelize= require('./index')
const {DataTypes}= require('sequelize')

const Course = sequelize.define('Course', {
  // Model attributes are defined here
  _course_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
  },
  _name:{
      type: DataTypes.STRING,
      allowNull: false
  },
  _description: {
      type: DataTypes.STRING,
      allowNull: true
  },
  _price: {
      type: DataTypes.FLOAT,
      allowNull: true
  },
  _star: {
      type: DataTypes.FLOAT,
      allowNull: true
  },
  _brief_description:{
      type: DataTypes.STRING
  },
  _image:{
      type: DataTypes.STRING
  },
  _type:{
      type: DataTypes.STRING
  },
  _views:{
      type: DataTypes.INTEGER
  }
},{
    tableName: 'Course',
    timestamps: false
});

module.exports=Course