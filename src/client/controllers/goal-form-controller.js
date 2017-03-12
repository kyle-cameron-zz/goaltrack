angular.module('GoalPosts.GoalForm.Controller', [])

.controller('GoalFormController', function ($scope, $window, $location, Goals) {
  $scope.rawGoalObj = {};
  $scope.title = '';
  $scope.description = '';
  $scope.due_date = '';
  $scope.textDisplay = ''

  $scope.userId = '';

  var addNewGoal = function() {
    Goals.addNewGoal($scope.rawGoalObj)
    .then(function (res) {
      console.log(res);
    })
    .catch(function (error) {
      console.error(error);
    });
  };

  $scope.submit = function() {
    $scope.rawGoalObj.title = $scope.title;
    $scope.rawGoalObj.description = $scope.description;
    $scope.rawGoalObj.user_id = $scope.userId;
    $scope.rawGoalObj.due_date = $scope.due_date;
    addNewGoal();
    $scope.textDisplay = $scope.rawGoalObj.title + ' has been added to your goals!';
  }

  var grabUserId = function() {
      console.log('goal form controller grabUserId is running')
      Goals.grabUserId()
    .then(function(res) {
      console.log('grabUserId is returning = ', res);
      $scope.userId = res;
    })
    .catch(function(err) {
      console.error(err);
    })
  }
  grabUserId();
});
