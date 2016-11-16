//here add the ngCookies module
var app = angular.module("chatapp", ['ngCookies']);

app.controller('chat', function($scope,$rootScope,$http,$cookies) {
  var socket = io();
  //use cookie to get username
  var use = $cookies.get('user_name');
  $scope.Hint = "Online Chat Room";
  $scope.send=function(TextInput){
    socket.emit('chat angular message', TextInput);
  }
//jquery is also able to be called
  socket.on('chat message', function(msg){
      $('#messages').append($('<li>').text(use+': '+msg));
   });
});