var express = require('express');
var router = express.Router();
const courseCotroller= require('../components/courses/courseControllers')
const classController= require('../components/classes/classControllers')
var loggedInGuard=require('../middlewares/loggedInGuard')

/* GET home page. */
router.get('/:id/class', classController.list)
router.get('/class/payment/:classID',loggedInGuard, classController.payment)
router.post('/class/payment/:classID', classController.purchase)
router.get('/',courseCotroller.list);

module.exports = router;
