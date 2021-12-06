
const Student = require("../../models/studentModel")
const User = require("../../models/userModel")
const bcrypt= require('bcrypt')

exports.findByUserName=(username)=>{
    return Student.findOne({raw: true, include:[{model:User, where:{_userName:username}}]})
}
exports.validatePassword=async (student, password)=>{
    return await bcrypt.compare(password,student['User._password'])
}
exports.register=async (infor)=>{
    
    const passHash= await bcrypt.hash(infor.password[0], 10)
    const user= await User.create({
        _ID: null,
        _userName: infor.username,
        _password: passHash,
        _firstName: infor.firstName,
        _lastName: infor.lastName,
        _email: infor.email,
        _phone: infor.phone,
        _address: infor.address,
        _avatar: 'https://res.cloudinary.com/vodinhphuc-fit-hcmus/image/upload/v1638797362/149071_hpvlhk.png'
    })
    await Student.create({
        _student_ID: null,
        _user_ID: user._ID,
        _balance: 0
    })
    return user;
}