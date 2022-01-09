const classservice = require('../classes/classService')
exports.list = (req, res, next) => {
    classservice.list(req.params.id).then(classes => {
        const page = parseInt(req.query.p) || 1
        const perpage = 9
        const start = (page - 1) * perpage
        const end = page * perpage
        const total=Math.ceil(classes.length / perpage)
        classes = classes.slice(start, end)
        res.render('classes/classes', {
            classes: classes, 
            pagination: {
                page: page,       // The current page the user is on
                pageCount:  total // The total number of available pages
            }
        })
    })
        .catch(next)
}

exports.payment= async (req, res)=>{
    const Class= await classservice.findOne(req.params.classID)

    console.log(Class)

    res.render('payment/payment', {Class})
}

exports.purchase= async (req, res)=>{
    const isExistsing= await classservice.checkRegistration(req.params.classID,req.user.studentID)
    if (isExistsing === null){
        await classservice.purchase(req.params.classID,req.user.studentID)
        res.status(201).json({success:true})
    }
    else res.status(401).json({failure:true})
    
}