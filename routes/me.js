var express = require('express');
var router = express.Router();
var meController=require('../components/me/meController')
router.get('/information', meController.information)
module.exports = router;