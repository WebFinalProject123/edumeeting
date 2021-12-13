
const { where } = require('sequelize/dist')
const courseModel= require('../../models/courseModel')
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
