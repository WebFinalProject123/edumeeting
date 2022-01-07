const studentService= require('./studentService')
exports.login=(req,res)=>{
    const redirect= req.query.redirect!==undefined
    const wrong= req.query['wrong']!==undefined
    if (redirect)
        res.render('authentication/login', {wrong:wrong, redirect:req.query.redirect})
    else
    {
        const Message=req.flash('error')[0]
        res.render('authentication/login', {wrong:wrong, Message:Message})
    }
}
const passport=require('../../passport')
exports.register=(req,res, next)=>{
    const user=studentService.register(req.body)
    
    res.redirect('/login');
}

exports.activate=(req,res)=>{
    studentService.activate(req.query.email, req.query.activationString)

    res.redirect("/login")
}

