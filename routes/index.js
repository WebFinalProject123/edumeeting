var express = require('express');
var router = express.Router();
var courseController=require('../components/courses/courseControllers')

/* GET home page. */
router.get('/', courseController.listFirstFourCourse);

module.exports = router;
