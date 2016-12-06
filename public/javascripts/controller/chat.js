//here add the ngCookies module
//use the cookie take the login control in the frontend
var app = angular.module("chatapp", ['ngCookies']);

app.controller('chat', ['$scope','$rootScope','$http','$cookies',function($scope,$rootScope,$http,$cookies) {
  $scope.Hint = "Online Chat Room";
  $scope.chat_number = 0;
  //use the cookie to get username and set the login control in the frontend
  //var use = $cookies.get('user_name');
  $scope.chat_user = $cookies.get('user_name');

  var socket = io();
  $scope.send=function(TextInput){
    socket.emit('chat angular message', TextInput);
    //clear the input 
    $scope.TextInput='';
    //in the backend listening to this event in the www file
  };

  socket.on('user name',function(msg){
    //shouldn't change the label's text
    //it would render all the pages
    //$('#user_name_id').text(msg);

    // the only way is to use angular and rewrite the socket.on function
    $scope.chat_user = msg;
    $scope.$apply();
  });

  //jquery is also able to be called
  socket.on('chat message', function(msg){
      $('#messages').append($('<li>').text(msg));
   });

  //listen to the user number changed
  socket.on('user number change', function(msg){
      //test if catch the event
      //$('#messages').append($('<li>').text(msg));
      //unable to use ecope to change angular model in socket.on
      //$rootScope.chat_number = msg;
      //but able to use jquery in the socket.on to change 
      $('h3').text('当前在线人数:' + msg);
  });

}]);