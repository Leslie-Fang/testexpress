var app = angular.module("first", []);
app.controller('login', function($scope,$http) {
    $scope.username = "John";
    $scope.loginstate='no';
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
                   $scope.loginstate='yes';
                   //$scope.username=data.username;
               }else {
                    alert("用户名或密码错误！");
                }
              //  window.location="/#/view/manage"
               // location.reload();
            });
    }
    
});


//document.write('<script src="javascripts/controller/logandreg.js"></script>');
