var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/messages', function(req, res, next) {
  // res.render('messages', { title: 'Messages' });
  res.send("here are the messages!!!!")
});



module.exports = router;