var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var my=require('../database/mysql_api')
/* GET home page. */
router.use(function(req,res,next){
	console.log("welcome!");
	console.log('Time:', Date.now());
	next();
});

router.get('/', function(req, res, next) {
  	res.render('index');
  	//res.send('first index page!');
});

router.get('/main', function(req, res, next) {
    res.render('main');
    //res.send('first index page!');
});

router.get('/sign_up', function(req, res, next) {
    res.render('signup');
    //res.send('first index page!');
});

router.get('/second/', function(req, res, next){
	console.log('Request Type:', req.method);
	next();
	},function(req, res, next) {
	res.send('second page!');
});

router.get('/upload/',function(req, res, next){
	res.render('upload');
});

router.post('/uploadimage/',function(req, res, next){
	//生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({uploadDir: './upload'});
    //上传完成后处理
    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
    });
});

router.get('/mysqltest/',function(req, res, next){
    my.createone();
    res.send('create successfully!');
});

router.post('/login/', function(req, res) {
    console.log(req.param('username'));
    console.log(req.param('password'));
    my.login(req,res);
   //res.send('login successfully!');
  });

router.post('/signup/', function(req, res) {
    console.log(req.param('username'));
    console.log(req.param('password'));
    my.signup(req,res);
   //res.send('login successfully!');
  });

module.exports = router;
