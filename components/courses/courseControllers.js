const courseService= require('../courses/courseServices')
const courseModel=require('../../models/courseModel')
exports.detail= async (req,res,next)=>{
    const course = await courseService.detail(req.params.id)
    let comments = await courseService.comment(req.params.id)
    let relativeCourses=await courseService.coursesByType(course._type, course._course_ID)
    
    courseModel.increment('_views', {where: {_course_ID: course._course_ID}});
    comments.sort((a,b)=>{
        return b._comment_ID - a._comment_ID;
    })
    const page = parseInt(req.query.p)||1
    const perpage=10
    const total= Math.ceil(comments.length/perpage)
    const start= (page-1)*perpage
    const end = page * perpage
    const classCount= await courseService.countAvailableClass(course._course_ID)
    comments=comments.slice(start, end)
    return res.render('courses/course_details',
    {
        classCount: classCount,
        course:course, 
        comments:comments, 
        relativeCourses: relativeCourses,
        pagination: {
            page: page,       // The current page the user is onp
            pageCount: total
        }
    });
   
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

exports.listFirstFourCourse= async (req, res)=>{
    let courses= await courseService.findAll()

    courses=courses.slice(0,4)

    res.render ('index', {courses})
}

