
const { where } = require('sequelize/dist')
const courseModel= require('../../models/courseModel')
const commentModel= require('../../models/commentModel')
const studentModel= require('../../models/studentModel')
const userModel=require('../../models/userModel')
const {Op}=require('sequelize')
exports.list=(query)=> {
    if (query.type==undefined && query.search==undefined)
    return courseModel.findAll({raw: true})
    else if (query.type!=undefined)
    return courseModel.findAll({raw: true, where:{
        _type: query.type
    }})
    else
    return courseModel.findAll({raw: true, where:{
        _name: {[Op.like]: `%${query.search}%`}
    }})
}
exports.detail=(id)=> courseModel.findByPk(id)

exports.comment=( _course_ID)=> commentModel.findAll({raw: true, where: {_course_ID: _course_ID}, include: [{model: studentModel, include: [{model:userModel}]}]})
