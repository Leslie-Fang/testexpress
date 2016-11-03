var mysql=require('mysql');

var config = {
	  host     : 'localhost',
	  user     : 'sampadm',
	  password : 'secret',
	  database : 'sampdb'
	};

exports.createone=function(){
	var connection = mysql.createConnection(config);
	connection.connect();
	connection.query('insert into express(id,name) values(4,\'James\')', function(err, rows, fields) {
	  if (err) throw err;
	 // console.log('The solution is: ', rows[0].solution);
	});
	connection.end();
}

exports.validate=function(){
	var connection = mysql.createConnection(config);
	connection.connect();
	connection.query('select * from express', function(err, rows, fields) {
	  if (err) throw err;
	 // console.log('The solution is: ', rows[0].solution);
	});
	connection.end();
}

exports.login=function(req, res){
	var sql='select u.username,u.password from user as u where username = ? and password = ?';
	var data=[req.param('username'),req.param('password')];
	var connection = mysql.createConnection(config);
	connection.connect();
	connection.query(sql,data,function (err,result) {
		var user=result[0];
		var response={state:false,id:'',loginid:''};
		if(user!=null){
			req.session={id:user.id,loginid:user.loginid};
			response.state=true;
			response.id=user.id;
			response.loginid=user.loginid;
		}
		res.json(response);
	});
	connection.end();
}

exports.signup=function(req, res){
	var sql='insert into user(username,password) values(?,?)';
	var data=[req.param('username'),req.param('password')];
	var connection = mysql.createConnection(config);
	connection.connect();
	connection.query(sql,data,function (err,result) {
		//var user=result[0];
		var response={state:false};
        if(result!=null){
			console.log('successfully!');
			response.state=true;
		//	req.session={id:result.insertId,loginid:req.param('username')};
		//	response.id=result.insertId;
		//	response.loginid=req.param('username');			
		}
		res.json(response);
	});
	connection.end();
}