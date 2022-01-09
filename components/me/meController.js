const classService = require('../classes/classService')
const meService = require('./meService')
const cloudinary = require('../../cloudinay/config')
exports.information = (req, res) => {
    res.render('me/information')
}

exports.classes = async (req, res) => {
    const registeredClasses = await classService.registered(req.user.studentID);
    const studyingClasses = await classService.studying(req.user.studentID);
    const completedClasses = await classService.completed(req.user.studentID);

    res.render('me/classes', { registeredClasses, studyingClasses, completedClasses });
}

exports.cancelRegistration = (req, res) => {
    classService.cancelRegistration(req.user.studentID, req.params.classID)
    res.redirect('/me/stored-classes')
}

exports.editInformation = (req, res) => {
    
    if (req.files != undefined) {
        const path = req.files.avatar
        cloudinary.uploader.upload(path.tempFilePath, (err, result) => {
            const avatar = result.url

             meService.updateInformation(avatar, req)


            req.session.passport.user.avatar = avatar
            req.session.passport.user.address = req.body.address
            req.session.passport.user.email = req.body.email
            req.session.passport.user.phone = req.body.phone
            req.session.passport.user.firstName = req.body.firstName
            req.session.passport.user.lastName = req.body.lastName

            res.locals.student=req.user;
            res.redirect('/me/information')
        })
    }
    else {
        const avatar = req.user.avatar
         meService.updateInformation(avatar, req)

        req.session.passport.user.avatar = avatar
        req.session.passport.user.address = req.body.address
        req.session.passport.user.email = req.body.email
        req.session.passport.user.phone = req.body.phone
        req.session.passport.user.firstName = req.body.firstName
        req.session.passport.user.lastName = req.body.lastName

        res.locals.student=req.user;
        res.redirect('/me/information')
    }

    
}

exports.editPassword= async (req,res) => {
    const oldPassword = req.body.oldPassword
    const newPassword=req.body.newPassword

    const check= await meService.checkPassword(req.user.username,oldPassword)

    if (check) {
        meService.updatePassword(req.user.username,newPassword)
        res.render('me/information')
    }
    else{
        res.render('me/editPassword',{wrong:true})
    }


}
exports.editUsername= async (req,res) => {
    const password=req.body.password
    const username=req.body.username

    const checkPass= await meService.checkPassword(req.user.username,password)

    if (checkPass)  {
        const checkUsername= await meService.checkUser(req.user.username,username)
        if (checkUsername == undefined) {
        meService.updateUsername(req.user.username,username)
        req.session.passport.user.username=username
        res.locals.student=req.user
        res.render('me/information')
        }
        else
        res.render('me/editUsername',{wrongUsername: true})
    }
    else{
        res.render('me/editUsername',{wrong:true})
    }
}