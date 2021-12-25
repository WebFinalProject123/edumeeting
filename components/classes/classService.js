
const classModel= require('../../models/classModel')
const registrationModel= require('../../models/registrationModel')
const Course = require('../../models/courseModel')
const Schedule = require('../../models/scheduleModel')
const teacher= require('../../models/teacherModel')
const User = require('../../models/userModel')
const { Op } = require('sequelize')
const sequelize = require('sequelize')
exports.list=(id)=> classModel.findAll({raw: true, where:{
    _course_ID: id,
    _startDate: {
        [Op.gt]: new Date()
    }, 
    _currentNumber: {
        [Op.lt]: sequelize.col('_maxNumber')
    }
}, include: [{model: Course, as: 'Course'},{model: Schedule, as: 'Schedule1'},{model: Schedule, as: 'Schedule2'},{ model: teacher, as: 'Teacher', include: {model: User, as: 'User', attributes: ['_firstName', '_lastName']}, attributes: ['_teacher_ID']}]})

exports.findOne=(id)=> classModel.findByPk(
    id, 
    {
        raw: true,
        include: 
        [
            {model: Course, as: 'Course'},
            {model: Schedule, as: 'Schedule1'},
            {model: Schedule, as: 'Schedule2'},
            { model: teacher, as: 'Teacher', include: {model: User, as: 'User', attributes: ['_firstName', '_lastName']}, attributes: ['_teacher_ID']}
        ]
    }
    )
exports.purchase= async (classID, studetID)=>{
    await registrationModel.create(
        {
            _student_ID: studetID,
            _class_ID: classID,
            _isPayed: true
        }
    )
    await classModel.increment('_currentNumber', {where: {_class_ID: classID}})
}