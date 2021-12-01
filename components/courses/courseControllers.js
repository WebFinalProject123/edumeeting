const courseService= require('../courses/courseServices')
exports.detail= (req,res,next)=>{
    courseService.detail(req.params.id).then(course=> {
        console.log(course);
        return res.render('courses/course_details',{course});
   })
    .catch(next)
}
exports.list= (req, res, next)=> {
    courseService.list().then(
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

