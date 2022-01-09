const userModel = require('../../models/userModel')
const bcrypt= require('bcrypt')
const Op = require('sequelize').Op;
exports.updateInformation=(avatar,req)=>
    userModel.findOne({where: {_userName: req.user.username}}).then((student)=>
        student.update({
            _firstName:  req.body.firstName,
            _lastName: req.body.lastName,
            _email: req.body.email,
            _phone: req.body.phone,
            _address: req.body.address,
            _avatar: avatar
        })
    )

exports.checkPassword = async (username, password) => {
    const student = await userModel.findOne({where: {_userName: username}})

    return bcrypt.compare(password,student._password)
}

exports.updatePassword = async (username, password) => {
    const passHash= await bcrypt.hash(password, 10)
    userModel.findOne({where: {_userName: username}}).then((student) => {
        student.update({_password: passHash})
    })
}

exports.updateUsername= (oldUsername, newUsername)=>{
    userModel.findOne({where: {_userName: oldUsername}}).then((student)=>{
        student.update({_userName: newUsername})
    })
}


exports.checkUser = (oldUsername, username) => userModel.findOne({where: {_userName: username, _username: {[Op.ne]: oldUsername}}})
