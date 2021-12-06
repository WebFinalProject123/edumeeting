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