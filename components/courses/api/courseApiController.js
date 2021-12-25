const courseApiService= require('./courseApiService')
exports.postComment= async (req, res)=>{
    if (!req.user)
    {
        res.status(401).json({message: 'unloggined'})
        return
    }
    const studentID= req.user.studentID;
    const courseID= req.params.courseID;
    const content=req.body.content;

    const comment= await courseApiService.postComment(studentID, courseID, content)

        res.status(201).json({
            _firstName: req.user.firstName,
            _lastName: req.user.lastName,
            _avatar: req.user.avatar,
            _content: comment._content,
            _create_At: comment._create_At
        })
}