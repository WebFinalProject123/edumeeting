require('dotenv').config();
const Student = require("../../models/studentModel")
const User = require("../../models/userModel")
const bcrypt= require('bcrypt')
const randomstring = require("randomstring");
const sgMail = require("./services/sendGrid")



exports.findByUserName=(username)=>{
    return Student.findOne({raw: true, include:[{model:User, where:{_userName:username}}]})
}
exports.validatePassword=async (student, password)=>{
    return await bcrypt.compare(password,student['User._password'])
}


const activationString = randomstring.generate()
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
        _avatar: 'https://res.cloudinary.com/vodinhphuc-fit-hcmus/image/upload/v1638797362/149071_hpvlhk.png',
        _status: false,
        _activationString : activationString
    })
    // Send activationString to user email
    
      

    const msg = {
    to: infor.email, // Change to your recipient
    from: process.env.EMAIL_SENDER, // Change to your verified sender
    subject: 'User account email acctivation',
    text: 'and easy to do anywhere, even with Node.js',
    html: `<h1>Thanks for register your account</h1> <p>Please activate your account <a href="${process.env.DOMAIN_NAME}/users/activate?email=${infor.email}&activation-string=${activationString}"> Activate now </a></p>`,
    }
    sgMail
    .send(msg)
    .then(() => {
        console.log(msg.to)
        console.log(msg.from)
        console.log(msg.subject)
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    })
      
    await Student.create({
        _student_ID: null,
        _user_ID: user._ID,
        _balance: 0
    })
    return user;
}