var app = angular.module("first", []);
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
				    window.location="/upload";//successfully nav to a page in the project
                   //$scope.username=data.username;
               }else {
                    alert("用户名或密码错误！");
                }
                //window.location="#/upload"
                //location.reload();
            });
    }
    
});


//document.write('<script src="javascripts/controller/logandreg.js"></script>');
