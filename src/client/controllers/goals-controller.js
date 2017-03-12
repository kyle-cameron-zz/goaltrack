angular.module('GoalPosts.Goals.Controller', [])

.controller('GoalsController', function ($scope, $window, $location, Goals) {
  $scope.goals = [];

  var getGoalsByUser = function () {
    Goals.getGoalsByUser($location.$$path.slice(7))
      .then(function (goals) {
        $scope.goals = goals;
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  getGoalsByUser();

});
