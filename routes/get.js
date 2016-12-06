var express = require('express');
var router = express.Router();

/* GET users listing. */
router.use(function(req,res,next){
	console.log("users get!");
  //console.log(req.Type());
  next();});

router.get('/', function(req, res, next) {
  res.send('respond with a get');
});

router.get('/main', function(req, res, next) {
    res.render('main');
    //res.send('first index page!');
});

module.exports = router;