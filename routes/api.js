var express = require('express');
var router = express.Router();
var courseApi=require('../components/courses/api')

router.use('/course_details', courseApi)

module.exports = router;