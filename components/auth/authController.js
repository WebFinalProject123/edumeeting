const studentService= require('./studentService')
exports.login=(req,res)=>{
    const redirect= req.query.redirect!==undefined
    const wrong= req.query['wrong']!==undefined
    if (redirect)
        res.render('authentication/login', {wrong:wrong, redirect:req.query.redirect})
    else
    res.render('authentication/login', {wrong:wrong})
}
const passport=require('../../passport')
exports.register=(req,res, next)=>{
    const user=studentService.register(req.body)
    
    res.redirect('/');
}

