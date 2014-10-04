/**
 * Created by Sandeep on 11/09/14.
 */
angular.module('todoApp.controllers',[]).controller('TodoListController',['$scope','Todo',function($scope,Todo){

    Todo.getAll().success(function(data){
        $scope.items=data.results;
    });

    $scope.onItemDelete=function(item){
        Todo.delete(item.objectId);
        $scope.items.splice($scope.items.indexOf(item),1);
    };

}]).controller('TodoCreationController',['$scope','Todo','$state',function($scope,Todo,$state){

    $scope.todo={};

    $scope.create=function(){
        Todo.create({content:$scope.todo.content}).success(function(data){
            $state.go('todos');
        });
    };


}]).controller('TodoEditController',['$scope','Todo','$state','$stateParams',function($scope,Todo,$state,$stateParams){

    $scope.todo={id:$stateParams.id,content:$stateParams.content};

    $scope.edit=function(){
        Todo.edit($scope.todo.id,{content:$scope.todo.content}).success(function(data){
            $state.go('todos');
        });
    };

}]).controller('takePictureController',['$scope','Todo','$state','$stateParams',function($scope,Todo,$state,$stateParams){

    $scope.todo={id:$stateParams.id,content:$stateParams.content};

    $scope.edit=function(){
        Todo.edit($scope.todo.id,{content:$scope.todo.content}).success(function(data){
            $state.go('todos');
        });
    };
    $scope.create=function(){
      $state.go('todos');
    };
    $scope.takePic = function() {
     var options =   {
         quality: 50,
         //destinationType: Camera.DestinationType.FILE_URI,
         sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
         encodingType: 0     // 0=JPG 1=PNG
     };
     navigator.camera.getPicture(onSuccess,onFail,options);
    };
    var onSuccess = function(FILE_URI) {
     console.log(FILE_URI);
     $scope.picData = FILE_URI;
     $scope.$apply();
    };
    var onFail = function(e) {
     console.log("On fail " + e);
    };
    $scope.send = function() {
     var myImg = $scope.picData;
     var options = new FileUploadOptions();
     options.fileKey="post";
     options.chunkedMode = false;
     var params = {};
     params.user_token = localStorage.getItem('auth_token');
     params.user_email = localStorage.getItem('email');
     options.params = params;
     var ft = new FileTransfer();
     ft.upload(myImg, encodeURI("https://example.com/posts/"), onUploadSuccess, onUploadFail, options);
   };
}]);
