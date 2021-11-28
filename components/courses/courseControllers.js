const courseService= require('../courses/courseServices')

exports.list= (req, res)=> {
    courseService.list().then(course=>  res.render('courses/courses',{course}))
}