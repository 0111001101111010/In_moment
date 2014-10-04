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
    $scope.takePic = function () {
      // var pic = $('#picture').attr('files')[0];
      // console.log(pic);
      var pic2 = angular.element(element)[0].getAttribute('#picture');
      console.log(pic2);
    };
}]);
