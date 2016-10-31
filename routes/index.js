var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var mysql=require('mysql');

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
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'sampadm',
	  password : 'secret',
	  database : 'sampdb'
	});
	connection.connect();

	connection.query('insert into express(id,name) values(2,\'bob\')', function(err, rows, fields) {
	  if (err) throw err;
	 // console.log('The solution is: ', rows[0].solution);
	});

	connection.end();
});

module.exports = router;
