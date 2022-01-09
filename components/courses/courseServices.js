
const { where } = require('sequelize/dist')
const courseModel= require('../../models/courseModel')
const commentModel= require('../../models/commentModel')
const studentModel= require('../../models/studentModel')
const userModel=require('../../models/userModel')
const classModel= require('../../models/classModel')
const {Op}=require('sequelize')
const sequelize = require('sequelize')
exports.list=(query)=> {
    let condition={}
    if (query.minPrice!== undefined)
        condition._price={[Op.between]:[query.minPrice, query.maxPrice]}
    if (query.type!==undefined)
        condition._type=query.type
    if (query.search!== undefined)
        condition._name= {[Op.like]: `%${query.search}%`}
    if(query.orderBy!== undefined)
    {
        return courseModel.findAll({raw: true, where: condition, order: [[query.orderBy, query.order]]})
    }
    return courseModel.findAll({raw: true, where: condition})
}
exports.detail=(id)=> courseModel.findByPk(id, {raw: true})

exports.coursesByType=(type)=> courseModel.findAll({raw: true, where:{_type: type}})

exports.comment=( _course_ID)=> commentModel.findAll({raw: true, where: {_course_ID: _course_ID}, include: [{model: studentModel, include: [{model:userModel}]}]})

exports.findAll=() =>courseModel.findAll({raw: true, order: [['_course_ID', 'ASC']]})

exports.countAvailableClass=(courseID)=>
    classModel.count({where: {
        _course_ID: courseID,
        _startDate: {
            [Op.gt]: new Date()
        },
        _currentNumber: {
            [Op.lt]: sequelize.col('_maxNumber')
        }}})
