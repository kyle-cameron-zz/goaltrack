angular.module('GoalPosts.Detail.Controller', [])

.controller('DetailController', function ($scope, $window, $location, Goals) {
  $scope.goal = {};
  $scope.goal.due_date = $scope.goal.due_date || 'Not Defined';

  $scope.updateGoalToCompleted = function () {
    console.log('DetailController updateGoalToCompleted has been invoked goal_id',$scope.goal['goal_id']);
    Goals.updateGoalToCompleted($scope.goal['goal_id'])
      .then(function (res) {
        console.log(res);
        getGoalByGoalId();
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  var getGoalByGoalId = function () {
    Goals.getGoalByGoalId($location.$$path.slice(8))
      .then(function (goal) {
        console.log(goal);
        $scope.goal = goal[0];
        console.log($scope.goal);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  getGoalByGoalId();

});
