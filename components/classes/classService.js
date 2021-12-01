
const classModel= require('../../models/classModel')
const Course = require('../../models/courseModel')
const teacher= require('../../models/teacherModel')
const User = require('../../models/userModel')
exports.list=(id)=> classModel.findAll({raw: true, where:{
    _course_ID: id
}, include: [{model: Course, as: 'Course'},{ model: teacher, as: 'Teacher', include: {model: User, as: 'User', attributes: ['_firstName', '_lastName']}, attributes: ['_teacher_ID']}]})