
const Student = require("../../models/studentModel")
const User = require("../../models/userModel")
const bcrypt = require('bcrypt')
const sgMail = require('../../sendGrid')
const random = require('randomstring')

exports.findByUserName = (username) => {
    return Student.findOne({ raw: true, include: [{ model: User, where: { _userName: username } }] })
}

exports.checkRegister=(username)=>User.findOne({where: { _userName: username}})

exports.logginByUser=(username) => {
    return Student.findOne({ raw: true, include: [{ model: User, where: { _userName: username, _status: true} }] })
}
exports.validatePassword = async (student, password) => bcrypt.compare(password, student['User._password'])

exports.register = async (infor) => {
    const activationString = random.generate()
    const passHash = await bcrypt.hash(infor.password[0], 10)
    const user = await User.create({
        _ID: null,
        _userName: infor.username,
        _password: passHash,
        _firstName: infor.firstName,
        _lastName: infor.lastName,
        _email: infor.email,
        _phone: infor.phone,
        _address: infor.address,
        _avatar: 'https://res.cloudinary.com/vodinhphuc-fit-hcmus/image/upload/v1638797362/149071_hpvlhk.png',
        _activationString: activationString,
        _isActivated: false,
        _isBanned: false
    })
    await Student.create({
        _student_ID: null,
        _user_ID: user._ID,
        _balance: 0
    })

    const msg = {
        to: infor.email, // Change to your recipient
        from: process.env.SENDER_EMAIL, // Change to your verified sender
        subject: 'Verification for edu course',
        text: 'Wellcome to my center !!!!!',
        html: `<h1>Thanks for beleiving on our course</h1> 
        <p> Please click activate to verify <a href="${process.env.DOMAIN_NAME}/users/activate?email=${infor.email}&activationString=${activationString}">Activate</p>`,
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })

}

exports.activate = (email, activationString) => {
    User.findOne({ where: { _email: email, _activationString: activationString } })
        .then((user) => {
            user.update({ _isActivated: true })
        }
        )
}

exports.sendMail=async (username, email, password) => {
    const passHash= await bcrypt.hash(password,10)
    const student = await Student.findOne({raw: true,include: {model: User, where: {_username: username, _email: email}}})

    console.log(student)

    if (student !== null) {
        const msg = {
            to: email, // Change to your recipient
            from: process.env.SENDER_EMAIL, // Change to your verified sender
            subject: 'Reset password edu course',
            text: 'Wellcome to my center !!!!!',
            html: `<h1>Thanks for beleiving on our course</h1> 
            <p> Please click to verify fot your new password <a href="${process.env.DOMAIN_NAME}/users/verifyResetPassword?email=${email}&activationString=${student['User._activationString']}&password=${passHash}&username=${username}">Verify</p>`,
        }
        sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                console.error(error)
            })
    }
    return student
}



exports.resetPassword=(email, username, activationString, password)=>
    User.findOne({where: {_userName: username,_email: email, _activationString: activationString}}).then((user)=>
        user.update({_password: password})
    )

