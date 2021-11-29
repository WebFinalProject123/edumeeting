const sequelize= require('./index')
const {DataTypes}= require('sequelize')

const Schedule = sequelize.define('Schedule', {
  // Model attributes are defined here
  _schedule_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
  },
  _dayOfWeek:{
    type: DataTypes.STRING,
    allowNull: false
  },
  _startHour:{
      type: DataTypes.STRING,
      allowNull: false
  },
  _endHour:{
    type: DataTypes.STRING,
    allowNull: false
}
},{
    tableName: 'Schedule',
    timestamps: false
});

module.exports=Schedule