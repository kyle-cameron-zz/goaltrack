angular.module('GoalPosts.Goals.Service', [])
.factory('Goals', function ($http, $location, $window) {
  var addNewGoal = function (rawGoalObj) {
    return $http({
      method: 'POST',
      url: '/goals',
      data: rawGoalObj
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var getAllGoals = function () {
    return $http({
      method: 'GET',
      url: '/goals'
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var getGoalsByUser = function (userId) {
    return $http({
      method: 'GET',
      url: '/goals/'+userId
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var updateGoalToCompleted = function (goalId) {
    return $http({
      method: 'POST',
      url: '/detail/'+goalId
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var getGoalByGoalId = function (goalId) {
    return $http({
      method: 'GET',
      url: '/detail/'+goalId
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var grabUserId = function () {
    console.log('goals-service grabUserId is running')
    return $http({
      method: 'GET',
      url: '/currentUserId/'
    })
    .then(function(resp) {
      console.log(resp);
      return resp.data[0];
    });
  };

  return {
    addNewGoal: addNewGoal,
    getAllGoals: getAllGoals,
    getGoalsByUser: getGoalsByUser,
    updateGoalToCompleted: updateGoalToCompleted,
    getGoalByGoalId: getGoalByGoalId,
    grabUserId: grabUserId
  };
});
