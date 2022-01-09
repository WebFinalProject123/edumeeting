const commentModel=require('../../../models/commentModel')
exports.postComment=(studentID, courseID, content)=>
    commentModel.create({
        _content: content, 
        _student_ID: studentID,
        _course_ID: courseID,
        _create_At: new Date().toDateString()
    })
