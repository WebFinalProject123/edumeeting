
const courseModel= require('../../models/courseModel')

exports.list=()=> courseModel.findAll({raw: true})
