var app = angular.module("app", []);
app.controller('login', function($scope,$http) {
    $scope.copy_username = "游客";
    //$scope.loginstate='you are not login';
    $scope.send=function(username,password) {
        $http({
            url:'/login',
            method:'post',
            data:{
                username	:	username,
                password	:	password
            }
        }).success(function(data) {
               if(data.state){
                   //$scope.loginstate='hi,'+$scope.username;
                   $scope.copy_username = $scope.username;
				  // window.location = "http://www.baidu.com";//successfully, nav to a outside web page
				           window.location="/main";//successfully nav to a page in the project
                   alert("登入成功!");
                   //$scope.username=data.username;
               }else {
                    alert("用户名或密码错误！");
                }
                //window.location="#/upload"
                //location.reload();
            });
    }
    
});
app.controller('regist', function($scope,$http) {
  $scope.send=function(username,password) {
        $http({
            url:'/signup',
            method:'post',
            data:{
                username  : username,
                password  : password
            }
        }).success(function(data) {
               if(data.state){
                   $scope.loginstate='yes';
                   window.location="/login";
                   alert("欢迎注册，登入之后可以看到更多内容!");
                   //$scope.username=data.username;
               }else {
                    alert("注册失败!");
                }
              //  window.location="/#/view/manage"
               // location.reload();
            });
    }
  });

//document.write('<script src="javascripts/controller/logandreg.js"></script>');
