
const courseModel= require('../../models/courseModel')

exports.list=()=> courseModel.findAll({raw: true})
exports.detail=(id)=> courseModel.findByPk(id)
