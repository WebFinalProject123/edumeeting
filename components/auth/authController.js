const studentService= require('./studentService')
exports.login=(req,res)=>{
    const wrong= req.query['wrong']!==undefined
    res.render('authentication/login', {wrong})
}
const passport=require('../../passport')
exports.register=(req,res, next)=>{
    const user=studentService.register(req.body)
    res.redirect('/');
}

