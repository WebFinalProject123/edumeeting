const Class = require('./classModels')
const Class_schedule = require('./class_scheduleModel')
const Course = require('./courseModel')
const sequelize = require('./index')
const Registration = require('./registrationModel')
const Schedule = require('./scheduleModel')
const Student = require('./studentModel')
const Teacher = require('./teacherModel')
const User = require('./userModel')
//const Teacher = require('./teacherModel')
module.exports= ()=>{
    Teacher.belongsTo(User, {foreignKey: '_user_ID', targetKey: '_ID'})
    User. hasOne(Teacher, {foreignKey: '_user_ID'})

    Class.belongsTo(Course, {foreignKey: '_course_ID', targetKey: '_course_ID'})
    Course.hasMany(Class,{foreignKey: '_course_ID'})

    Class.belongsTo(Teacher, {foreignKey: '_teacher_ID', targetKey: '_teacher_ID'})
    Teacher.hasMany(Class, {foreignKey: '_teacher_ID'})

    Class_schedule.belongsTo(Class, {foreignKey: '_class_ID', targetKey: '_class_ID'})
    Class.hasMany(Class_schedule, {foreignKey: '_class_ID'})

    Class_schedule.belongsTo(Schedule, {foreignKey:'_schedule_ID', targetKey:'_schedule_ID'})
    Schedule.hasMany(Class_schedule,{foreignKey:'_class_ID'})

    Registration.belongsTo(Class, {foreignKey:'_class_ID', targetKey: '_class_ID'})
    Class.hasMany(Registration,{foreignKey:'_class_ID'})

    Registration.belongsTo(Student, {foreignKey:'_student_ID', targetKey: '_student_ID'})
    Student.hasMany(Registration,{foreignKey:'_student_ID'})

    Student.belongsTo(User, {foreignKey: '_user_ID', targetKey: '_ID'})
    User. hasOne(Student, {foreignKey: '_user_ID'})

}