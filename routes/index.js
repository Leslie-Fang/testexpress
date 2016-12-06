var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var my=require('../database/mysql_api');
var cookieParser = require('cookie-parser');
var app = require('../app');
var global_data=require('../database/global');
var redis_client=require('../database/redis_api');

//the router in other files such as the signup.js also would pass this router
//user_id_number = 0;

router.use(function(req,res,next){
	console.log("welcome!");
	console.log('Time:', Date.now());
  console.log('%s,%s',req.method,req.path);
  //console.log(app);
  //console.log(redis);
  //console.log(global_data);

/*
  //test local redis
  //redis_client.set("blue","success_again");

  //get user-agent to distinguish different users
  var ua = req.headers['user-agent'];
  console.log(ua);
  //console.log(redis_client.set("blue","aop"));
  //if it's a new user, provide a user-id

  //use the callback function to get the value
  redis_client.hexists("user_ua_id",ua,function(err, replies){
    if(replies == 0){
      //if new user, user-agent not exist in the hashmap
      //then set the uaer-agent and the user-id
      user_id_number = user_id_number + 1;
      redis_client.hset("user_ua_id",ua,user_id_number);
      //redis_client.hset("user_id_ua",user_id_number,ua);
      //console.log("hexists_judge" + user_id_number);
    }
    else{
      console.log(replies);
      console.log("hexists_judge" + user_id_number);
    }
  });*/

  //test hkeys
  /*redis_client.hkeys("myhash",function(err, replies){
    console.log(replies.length + " replies:");
    replies.forEach(function (reply, i) {
        console.log("    " + i + ": " + reply);
    });
  });*/

  if(req.cookies.user_name){
    console.log(req.cookies);
  }
  else{
   /* //async unable
    redis_client.hget("user_ua_id",ua,function(err, replies){
      console.log("hy");
      console.log(replies);
    });
    console.log("hn");*/
    //also set cookie here in the first time
    //username in the cookie would be used in the front-end
    res.cookie('user_name', "游客", {maxAge: 60*60*1000});
  }

  // 检查 session 中的 isVisit 字段
  // 如果存在则增加一次，否则为 session 设置 isVisit 字段，并初始化为 1。
  if(req.session.isVisit) {
    req.session.isVisit++;
    console.log(req.session);
   // res.send('<p>第 ' + req.session.isVisit + '次来此页面</p>');
  } else {
    req.session.isVisit = 1;
    req.session.user = "游客";
   // res.send("欢迎第一次来这里");
   // console.log(req.session);
    //init set time -1, only avaiable in this window
  }
  next();
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
