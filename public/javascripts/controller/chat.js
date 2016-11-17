//here add the ngCookies module
//use the cookie take the login control in the frontend
var app = angular.module("chatapp", ['ngCookies']);

app.controller('chat', function($scope,$rootScope,$http,$cookies) {
  $scope.Hint = "Online Chat Room";
//use the cookie to get username and set the login control in the frontend
  var use = $cookies.get('user_name');
  
  var socket = io();
  $scope.send=function(TextInput){
    socket.emit('chat angular message', TextInput);
    $scope.TextInput='';
//in the backend listening to this event in the www file
  }
//jquery is also able to be called
  socket.on('chat message', function(msg){
      $('#messages').append($('<li>').text(msg));
   });
});