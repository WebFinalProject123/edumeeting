var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('meetings/meeting_details', { title: 'Express' });
});

module.exports = router;
