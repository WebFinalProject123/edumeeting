const sequelize= require('./index')
const {DataTypes, Model}= require('sequelize')
const Comment = sequelize.define('Comment', {
    // Model attributes are defined here
    _comment_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    _course_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    _create_At:{
        type: DataTypes.DATE
    },
    _student_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    _content:{
        type: DataTypes.STRING
    }
  },{
      tableName: 'Comment',
      timestamps: false
  });

  module.exports=Comment