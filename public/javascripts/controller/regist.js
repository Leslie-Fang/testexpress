var app = angular.module("signup", []);
app.controller('regist', function($scope,$http) {
	$scope.send=function(username,password) {
        $http({
            url:'/signup',
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
                    alert("注册失败!");
                }
              //  window.location="/#/view/manage"
               // location.reload();
            });
    }
	});