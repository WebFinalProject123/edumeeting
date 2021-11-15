var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('meetings/meetings', { title: 'Express' });
});

module.exports = router;
