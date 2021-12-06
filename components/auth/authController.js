const studentService= require('./studentService')
exports.login=(req,res)=>{
    const wrong= req.query['wrong']!==undefined
    res.render('authentication/login', {wrong})
}
exports.register=(req,res)=>{
    studentService.register(req.body).then(()=>{res.redirect('/login')})
}