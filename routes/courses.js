var express = require('express');
var router = express.Router();
const courseCotroller= require('../components/courses/courseControllers')

/* GET home page. */
router.get('/',courseCotroller.list);

module.exports = router;
