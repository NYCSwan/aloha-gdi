var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/messages', function (req, res) {
    res.send('Add a book')
});

module.exports = router;
