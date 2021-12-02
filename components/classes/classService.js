
const classModel= require('../../models/classModel')
const Course = require('../../models/courseModel')
const Schedule = require('../../models/scheduleModel')
const teacher= require('../../models/teacherModel')
const User = require('../../models/userModel')
exports.list=(id)=> classModel.findAll({raw: true, where:{
    _course_ID: id
}, include: [{model: Course, as: 'Course'},{model: Schedule, as: 'Schedule1'},{model: Schedule, as: 'Schedule2'},{ model: teacher, as: 'Teacher', include: {model: User, as: 'User', attributes: ['_firstName', '_lastName']}, attributes: ['_teacher_ID']}]})