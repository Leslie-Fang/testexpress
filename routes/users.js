var express = require('express');
var router = express.Router();

/* GET users listing. */
router.use(function(req,res,next){
	console.log("users router!");
  //console.log(req.Type());
  next();});
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
