const sequelize= require('./index')
const {DataTypes}= require('sequelize')

const Registration = sequelize.define('Registration', {
  // Model attributes are defined here
  _class_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
  },
  _student_ID:{
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  _isPayed:{
      type: DataTypes.TINYINT
  },
  date:{
    type: DataTypes.DATE,
  }
},{
    tableName: 'Registration',
    timestamps: false
});

module.exports=Registration