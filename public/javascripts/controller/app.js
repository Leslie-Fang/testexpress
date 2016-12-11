var app = angular.module("app", []);
//the global varable in the rootScope is able to use in all the followingcontrollers
//but when the page reloaded, this global varable would also reinit 
app.run(function($rootScope) {
    $rootScope.user="游客A";
});
app.controller('login', function($scope,$http) {
    //$rootScope.user="游客A";
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
        }).then(
          function successCallback(response) {
               if(response.data.state){
                   //$scope.loginstate='hi,'+$scope.username;
                   $scope.copy_username = $scope.username;
                  // $rootScope.user=$scope.username;
                   //$rootScope
          // window.location = "http://www.baidu.com";//successfully, nav to a outside web page
                   window.location="/main";//successfully nav to a page in the project
                   alert("登入成功!");
                   //$scope.username=data.username;
               }else {
                    alert("用户名或密码错误！");
                }
                //window.location="#/upload"
                //location.reload();
            },
            function errorCallback(response){
              alert("post response wrong");}
          )
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
        }).then(
            function successCallback(response) {
               if(response.data.state){
                   //$scope.loginstate='hi,'+$scope.username;
                   $scope.copy_username = $scope.username;
                  // $rootScope.user=$scope.username;
                   //$rootScope
          // window.location = "http://www.baidu.com";//successfully, nav to a outside web page
                   window.location="/main";//successfully nav to a page in the project
                   alert("注册成功!");
                   //$scope.username=data.username;
               }else {
                    alert("用户名或密码错误！");
              }
                //window.location="#/upload"
                //location.reload();
            },
            function errorCallback(response){
              alert("post response wrong");}
            )
    }
  });
app.controller('index', function($scope,$http) {
    
});
app.controller('main', function($scope,$http) {
    
});
//document.write('<script src="javascripts/controller/logandreg.js"></script>');
