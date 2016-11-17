var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var my=require('../database/mysql_api');
var cookieParser = require('cookie-parser');

//app load from app.js file, couldn't redefine app
//var app = require('../app');
//var users = require('./users');
//var get = require('./get');
/* GET home page. */
//basic router, here every request would pass this router
//router.use('/users', users);
//router.use('/get', get);

//the router in other files such as the signup.js also would pass this router
router.use(function(req,res,next){
	console.log("welcome!");
	console.log('Time:', Date.now());
  console.log('%s,%s',req.method,req.path);

  if(req.cookies.user_name){
    console.log(req.cookies);
  }
  else{
    //init set time -1, only avaiable in this window
    res.cookie('user_name', '游客', {maxAge: 60*1000});
  }
  
  // 检查 session 中的 isVisit 字段
  // 如果存在则增加一次，否则为 session 设置 isVisit 字段，并初始化为 1。
  if(req.session.isVisit) {
    req.session.isVisit++;
    console.log(req.session);
   // res.send('<p>第 ' + req.session.isVisit + '次来此页面</p>');
  } else {
    req.session.isVisit = 1;
    req.session.user = 'visitor_abc';
   // res.send("欢迎第一次来这里");
    console.log(req.session);
  }
  next();
  //console.log(req.Type());
  //signup page would be affected by the login controller
  /*if(req.path == '/signup'){
    next();
  }
  else{
    if(req.method == 'GET'){
          console.log('11111');
          //if cookies expire, cookies would clear
          if(req.cookies.login == null){
            //if username is null,not login yet 
            //must visit the login page
            res.render('index');
          }else{
            //everytime user give a request
            //reset the expire time of the cookies
            //res.cookie('', req.param('username'));
            //if login,do something continue
            console.log(req.cookies);
            //set the cookies again to avoid expire
            res.cookie('login', 'Yes',{maxAge: 60*1000});
            next();
        }
    }
    else{
    next();};};*/
  /*
  if(req.cookies.isVisit){
    console.log(req.cookies);
  }
  else{
    res.cookie('isVisit', 1, {maxAge: 60 * 1000});
  }*/
  /*
  if(req.cookies.username == null){
    //if username is null,not login yet 
    //must visit the login page
    res.render('index');
  }else{
    //everytime user give a request
    //reset the expire time of the cookies
    //res.cookie('', req.param('username'));
    //if login,do something continue
    console.log(req.cookies);
    next();
  }*/
});

router.get('/', function(req, res, next) {
    res.render('index');
    //res.send('first index page!');
});

router.get('/login/',function(req, res, next){
  res.render('login');
});

router.get('/main', function(req, res, next) {
    res.render('main');
    //res.send('first index page!');
});

router.get('/chat', function(req, res, next) {
    res.render('onlinechat');
    //res.send('first index page!');
});

router.get('/reactjs', function(req, res, next) {
    res.render('reactjstest');
    //res.send('react!');
});
/*
router.get('/sign_up', function(req, res, next) {
    res.render('signup');
    //res.send('first index page!');
});*/

router.get('/second/', function(req, res, next){
  console.log('Request Type:', req.method);
  next();
  },function(req, res, next) {
  res.send('second page!');
});

router.get('/upload/',function(req, res, next){
  res.render('upload');
});

router.get('/mysqltest/',function(req, res, next){
    my.createone();
    res.send('create successfully!');
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
