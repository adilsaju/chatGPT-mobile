var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  console.log("hello");
  res.json("ab")
});

router.post('/connection', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  console.log("hello");
  res.json("ab")
});

router.get('/:id/message', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  console.log("hello");
  res.json("ab")
});


module.exports = router;
