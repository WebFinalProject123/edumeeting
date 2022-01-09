var express = require('express');
var router = express.Router();
var meController=require('../components/me/meController')
router.get('/information', meController.information)
router.get('/stored-classes', meController.classes)
router.get('/cancel_registration/:classID', meController.cancelRegistration)
router.get('/edit/username',(req,res)=>{
    res.render('me/editUsername')
})

router.get('/edit/password',(req,res)=>{
    res.render('me/editPassword')
})

router.get('/edit/information',(req,res)=>{
    res.render('me/editInformation')
})
router.post('/edit/information', meController.editInformation)

router.post('/edit/password', meController.editPassword)

router.post('/edit/username', meController.editUsername)

module.exports = router;