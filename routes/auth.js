var express = require('express');
var router = express.Router();
var authController=require('../components/auth/authController')
var passport=require('../passport')

/* GET home page. */
router.get('/login', authController.login);
router.post('/login', passport.authenticate('local', 
{ 
  failureRedirect: '/login?wrong',
  failureFlash: true
}
),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
  });
router.get('/logout', (req,res)=>{
    req.logout()
    res.redirect('/')
})
/* GET home page. */
router.get('/register', function(req, res, next) {
    res.render('authentication/register', { title: 'Express' });
  });
router.post('/register', authController.register)

router.get('/users/activate', authController.activate)

router.get('/users/verifyResetPassword', authController.verify)

router.get('/forgotPassword', (req, res, next) => {
  res.render('authentication/forgotPassword')
})

router.post('/reset/password', authController.resetPassword)
module.exports = router;