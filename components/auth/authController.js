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
exports.register=async (req,res, next)=>{
    const user=await studentService.checkRegister(req.body.username)

    if (user!=null)
        res.render('authentication/register',{error: "Username is exitsted !!!"})
    else{
    studentService.register(req.body)
    res.redirect('/login');
    }
}

exports.activate=(req,res)=>{
    studentService.activate(req.query.email, req.query.activationString)

    res.redirect("/login")
}

exports.resetPassword= async (req,res)=>{
    const sent= await studentService.sendMail(req.body.username, req.body.email, req.body.password)

    if (sent !== null)
    {
        res.redirect('/login');
    }
    else{
        res.render('authentication/forgotPassword', {wrong: true})
    }
    
}

exports.verify = async (req,res)=>{
    await studentService.resetPassword(req.query.email, req.query.username, req.query.activationString, req.query.password)

    res.redirect('/login')
}


