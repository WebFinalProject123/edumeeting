var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const studentService = require("../components/auth/studentService")

passport.use(new LocalStrategy(
  async function (username, password, done) {
    const student = await studentService.findByUserName(username)

    if (!student)
      return done(null, false, {type: 'error', message: "Invalid username" })
    else if (student['User._isActivated']==false){
      return done(null, false, {type: 'error', message: "Your account is not activated" })
    }
    else if(student['User._isBanned']==true)
    { 
      return done(null, false, {type: 'error', message: "Your account is banned. Please conntact admin to learn more." })
    }
    else {
      const check = await studentService.validatePassword(student, password)
      if (!check) {
        return done(null, false, {type: 'error',  message: "Incorrect password" })
        
      }
      return done(null, student);
    }
  }
));
passport.serializeUser(function (student, done) {
  done(null, {
    studentID: student._student_ID,
    username: student['User._userName'],
    firstName: student['User._firstName'],
    lastName: student['User._lastName'],
    phone: student['User._phone'],
    email: student['User._email'],
    address: student['User._address'],
    avatar: student['User._avatar']
  });
});

passport.deserializeUser(function (student, done) {
  done(null, student);
});
module.exports = passport