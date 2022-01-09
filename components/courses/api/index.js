var express = require('express');
var router = express.Router();
var courseApiController=require('./courseApiController')

router.post('/:courseID/comment', courseApiController.postComment)

module.exports =router;