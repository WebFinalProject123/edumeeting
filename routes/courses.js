var express = require('express');
var router = express.Router();
const courseCotroller= require('../components/courses/courseControllers')
const classController= require('../components/classes/classControllers')

/* GET home page. */
router.get('/:id/class', classController.list)
router.get('/',courseCotroller.list);

module.exports = router;
