const courseService= require('../courses/courseServices')
const courseModel=require('../../models/courseModel')
exports.detail= async (req,res,next)=>{
    const course = await courseService.detail(req.params.id)
    const comments = await courseService.comment(req.params.id)
    courseModel.increment('_views', {where: {_course_ID: course._course_ID}});
    comments.sort((a,b)=>{
        return b._comment_ID - a._comment_ID;
    })
    return res.render('courses/course_details',{course:course, comments:comments});
   
}
exports.list= (req, res, next)=> {
    courseService.list(req.query).then(
        (course)=>  {
            const page = parseInt(req.query.p)||1
            const perpage=9
            const total= Math.ceil(course.length/perpage)
            const start= (page-1)*perpage
            const end = page * perpage
            course=course.slice(start, end)
            res.render('courses/courses',{course: course,  pagination: {
                page: page,       // The current page the user is on
                pageCount: total  // The total number of available pages
              }})
        }
        )
    .catch(next)
}

